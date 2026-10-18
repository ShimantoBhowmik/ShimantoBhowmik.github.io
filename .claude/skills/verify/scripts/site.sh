#!/bin/sh
# Builds the site the way CI does and serves it on a private port, one isolated instance per run.
#
#   site.sh up [run-id]     build into .verify/<run>/state/dist, serve it, print RUN and URL
#   site.sh doctor <run>    read-only health check; exits 1 if the instance is not worth driving
#   site.sh down <run>      stop the server this run started, drop state, keep evidence
#   site.sh list            every run on disk and whether its server is still up
set -eu

ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
VERIFY="$ROOT/.verify"
ASTRO="$ROOT/node_modules/.bin/astro"

die() {
  echo "error: $*" >&2
  exit 1
}

need_run() {
  [ -n "${1:-}" ] || die "missing run id (see: site.sh list)"
  RUN="$1"
  STATE="$VERIFY/$RUN/state"
  [ -f "$STATE/env" ] || die "no running state for run '$RUN' in $VERIFY"
  . "$STATE/env"
}

# Newest modification time (epoch seconds) of anything that changes the built site.
source_mtime() {
  find "$ROOT/src" "$ROOT/public" "$ROOT/astro.config.mjs" "$ROOT/package.json" -type f \
    -exec stat -f %m {} + | sort -n | tail -1
}

cd "$ROOT"

alive() {
  kill -0 "$1" 2>/dev/null
}

cmd_up() {
  RUN="${1:-$(date +%Y%m%d-%H%M%S)-$$}"
  STATE="$VERIFY/$RUN/state"
  [ ! -e "$STATE/env" ] || die "run '$RUN' already has a server; use another id or site.sh down $RUN"
  mkdir -p "$STATE" "$VERIFY/$RUN/evidence"
  [ -x "$ASTRO" ] || die "node_modules missing; run npm install in $ROOT"

  BUILT_MTIME="$(source_mtime)"
  echo "building into $STATE/dist (bangla check, astro check, astro build)..."
  if ! (node scripts/check-bangla.mjs && "$ASTRO" check &&
    "$ASTRO" build --outDir "$STATE/dist") >"$STATE/build.log" 2>&1; then
    tail -30 "$STATE/build.log" >&2
    die "build failed; full log in $STATE/build.log"
  fi

  PORT="$(node -e 'const s=require("net").createServer().listen(0,"127.0.0.1",()=>{console.log(s.address().port);s.close()})')"
  URL="http://127.0.0.1:$PORT"
  # --ignore-lock keeps the server in the foreground and away from .astro/preview.json, so a
  # preview the user started is never seen, reused or stopped by a verification run.
  nohup "$ASTRO" preview --ignore-lock --outDir "$STATE/dist" --host 127.0.0.1 --port "$PORT" \
    >"$STATE/preview.log" 2>&1 &
  PID=$!

  i=0
  until [ "$(curl -s -o /dev/null -w '%{http_code}' "$URL/")" = 200 ]; do
    i=$((i + 1))
    if [ "$i" -gt 60 ] || ! alive "$PID"; then
      cat "$STATE/preview.log" >&2
      die "server did not answer at $URL"
    fi
    sleep 0.25
  done

  cat >"$STATE/env" <<EOF
PORT=$PORT
URL=$URL
PID=$PID
BUILT_MTIME=$BUILT_MTIME
BUILT_HEAD=$(git -C "$ROOT" rev-parse --short HEAD)
EOF
  echo "RUN=$RUN"
  echo "URL=$URL"
  echo "EVIDENCE=$VERIFY/$RUN/evidence"
}

cmd_doctor() {
  need_run "${1:-}"
  ok=1
  check() {
    if [ "$1" = pass ]; then echo "ok    $2"; else
      echo "FAIL  $2"
      ok=0
    fi
  }

  alive "$PID" && check pass "server pid $PID is alive" || check fail "server pid $PID is gone"

  listener="$(lsof -nP -t -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | head -1 || true)"
  [ "$listener" = "$PID" ] && check pass "port $PORT is owned by this run" ||
    check fail "port $PORT is owned by pid '${listener:-none}', not $PID"

  body="$(curl -s "$URL/" || true)"
  echo "$body" | grep -q '<title>Shimanto Bhowmik' && check pass "$URL/ serves the home page" ||
    check fail "$URL/ does not serve the home page"

  [ "$(curl -s -o /dev/null -w '%{http_code}' "$URL/resume.pdf")" = 200 ] &&
    check pass "/resume.pdf is served" || check fail "/resume.pdf is not served"

  [ "$(curl -s -o /dev/null -w '%{http_code}' "$URL/verify-doctor-missing")" = 404 ] &&
    check pass "unknown paths answer 404" || check fail "unknown paths do not answer 404"

  now_mtime="$(source_mtime)"
  [ "$now_mtime" -le "$BUILT_MTIME" ] && check pass "build is current with src/ and public/" ||
    check fail "sources changed after the build; site.sh down $RUN && site.sh up"

  head_now="$(git -C "$ROOT" rev-parse --short HEAD)"
  [ "$head_now" = "$BUILT_HEAD" ] && check pass "built from HEAD $BUILT_HEAD" ||
    check fail "built from $BUILT_HEAD but HEAD is now $head_now"

  [ "$ok" = 1 ] || exit 1
}

cmd_down() {
  need_run "${1:-}"
  # Kill only the pid this run recorded, and only if it is still our preview server.
  if alive "$PID" && ps -o command= -p "$PID" | grep -q "$STATE/dist"; then
    kill "$PID"
    i=0
    while alive "$PID" && [ "$i" -lt 20 ]; do
      sleep 0.1
      i=$((i + 1))
    done
    alive "$PID" && kill -9 "$PID"
  fi
  mkdir -p "$VERIFY/$RUN/evidence/server"
  cp "$STATE/build.log" "$STATE/preview.log" "$VERIFY/$RUN/evidence/server/" 2>/dev/null || true
  rm -rf "$STATE"
  echo "stopped run $RUN; evidence kept in $VERIFY/$RUN/evidence"
}

cmd_list() {
  [ -d "$VERIFY" ] || exit 0
  for dir in "$VERIFY"/*/; do
    [ -d "$dir" ] || continue
    run="$(basename "$dir")"
    if [ -f "$dir/state/env" ]; then
      . "$dir/state/env"
      alive "$PID" && echo "$run  up    $URL (pid $PID)" || echo "$run  dead  (stale state; site.sh down $run)"
    else
      echo "$run  down  evidence only"
    fi
  done
}

case "${1:-}" in
  up) cmd_up "${2:-}" ;;
  doctor) cmd_doctor "${2:-}" ;;
  down) cmd_down "${2:-}" ;;
  list) cmd_list ;;
  *) die "usage: site.sh up [run-id] | doctor <run> | down <run> | list" ;;
esac
