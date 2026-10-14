// Everything the site says lives here. Layout code never hard-codes content.
// House rule: no job titles anywhere. Places are named by organization, years and the work done.

interface Link {
  label: string;
  href: string;
}

interface Result {
  value: string;
  label: string;
}

interface Stint {
  years: string;
  focus: string;
  detail?: string;
  results: Result[];
  cite?: string;
  link?: Link;
}

export interface Place {
  id: string;
  org: string;
  location: string;
  years: string;
  href?: string;
  stints: Stint[];
}

interface Project {
  name: string;
  summary: string;
  stack: string[];
  links: Link[];
}

interface Award {
  years: string;
  name: string;
  note?: string;
  from: string;
}

export const person = {
  name: 'Shimanto Bhowmik',
  nameBn: 'সীমান্ত ভৌমিক',
  location: 'Arlington, VA',
  email: 'bhowmikshimanto@gmail.com',
  statement: 'I build the systems that ship software and move data.',
  lede: 'At AWS Security, that’s the software on the cameras in AWS data centers and the live video they stream. Before that: Alexa+ experimentation and model releases at Amazon AGI.',
  description:
    'Shimanto Bhowmik builds the systems that ship software and move data: camera software and live video for AWS data center security, and Alexa+ experimentation and model releases at Amazon AGI. Arlington, VA.',
};

export const links = {
  resume: '/resume.pdf',
  github: 'https://github.com/ShimantoBhowmik',
  linkedin: 'https://www.linkedin.com/in/shimantobhowmik',
  scholar: 'https://scholar.google.com/citations?user=a3Vfg2EAAAAJ',
  youtube: 'https://www.youtube.com/@scarstark',
};

export interface Stop {
  /** Anchor of the entry this stop links to. */
  id: string;
  label: string;
  /** Year and month, YYYY-MM. */
  start: string;
  /** Omitted while ongoing. */
  end?: string;
  /** A longer stint that ran alongside other work, drawn as a branch hanging under the line. */
  branch?: boolean;
}

// The Work timeline, oldest first, drawn to scale from the first start to today.
export const timeline: Stop[] = [
  { id: 'rit-cs', label: 'RIT Computer Science', start: '2022-01', end: '2022-05' },
  { id: 'amazon-agi', label: 'Amazon AGI', start: '2023-05', end: '2023-08' },
  { id: 'sage-ai', label: 'Sage AI', start: '2023-09', end: '2024-05', branch: true },
  { id: 'amazon-agi', label: 'Amazon AGI', start: '2024-05', end: '2024-09' },
  { id: 'stanford', label: 'Stanford AI Lab', start: '2024-09', end: '2025-05', branch: true },
  { id: 'amazon-agi', label: 'Amazon AGI', start: '2025-05', end: '2025-08' },
  { id: 'finpilot', label: 'FinPilot', start: '2026-01', end: '2026-04' },
  { id: 'aws', label: 'AWS Security', start: '2026-04' },
];

export const work: Place[] = [
  {
    id: 'aws',
    org: 'Amazon Web Services',
    location: 'Arlington, VA',
    years: '2026 – now',
    href: 'https://aws.amazon.com/security/',
    stints: [
      {
        years: '2026 – now',
        focus: 'Data center security cameras',
        detail:
          'Deploying the software that runs on the security cameras in AWS data centers, and streaming their video live.',
        results: [],
      },
    ],
  },
  {
    id: 'finpilot',
    org: 'FinPilot',
    location: 'Seattle',
    years: '2026',
    stints: [
      {
        years: '2026',
        focus: 'CRM integrations and performance tracking',
        detail:
          'Built a schema mapping engine and a differential sync pipeline for CRM integrations (Bipsync, Altvia) that automated onboarding for three enterprise clients. Designed and launched a greenfield performance tracking module that uses LLMs to fill in return metrics, with manual overrides and funds linked across portfolios.',
        results: [
          { value: '−85%', label: 'onboarding setup time' },
          { value: '< 1 h', label: 'data staleness' },
        ],
      },
    ],
  },
  {
    id: 'amazon-agi',
    org: 'Amazon AGI',
    location: 'Seattle',
    years: '2023 – 2025',
    href: 'https://amazon.jobs/content/en/teams/agi',
    stints: [
      {
        years: '2025',
        focus: 'Alexa+ experimentation platform',
        detail:
          'Built parallel experimentation for Alexa+ with traffic splitting and consistent hashing in Kotlin and Guava, then moved the platform from single-lane to multi-tenant with deterministic identity routing and isolation guardrails.',
        results: [
          { value: 'days to minutes', label: 'experiment turnaround' },
          { value: '+60%', label: 'experiment accuracy' },
        ],
      },
      {
        years: '2024',
        focus: 'Model release pipeline',
        detail:
          'Built the model release pipeline that takes models from training to production, enforcing semantic versioning and automated checks, with end-to-end regression and post-deploy testing.',
        results: [
          { value: '−60%', label: 'time to release' },
          { value: '−90%', label: 'update time' },
        ],
      },
      {
        years: '2023',
        focus: 'LLM evaluation for Alexa Q&A',
        detail:
          'Designed and rolled out a rubric-driven feedback pipeline and evaluation dashboards for the next-generation Alexa Q&A model, plus a side-by-side interface for prompting several LLMs at once.',
        results: [
          { value: '+9%', label: 'model performance' },
          { value: '−12%', label: 'end-to-end testing time' },
        ],
      },
    ],
  },
  {
    id: 'sage-ai',
    org: 'Sage AI',
    location: 'Remote',
    years: '2023 – 2024',
    stints: [
      {
        years: '2023 – 2024',
        focus: 'Full-stack CRM and financial analysis',
        detail:
          'Owned a full-stack CRM end to end (React, Rust, DynamoDB, Cognito) with secure onboarding, real-time analytics and zero-downtime releases. Built a production SEC filings ingestion pipeline in Python feeding LLM-driven financial analysis.',
        results: [
          { value: '+42%', label: 'customer engagement' },
          { value: '+36%', label: 'bank decision accuracy' },
        ],
      },
    ],
  },
];

export const research: Place[] = [
  {
    id: 'stanford',
    org: 'Stanford AI Lab',
    location: 'Remote',
    years: '2024 – 2025',
    href: 'https://ai.stanford.edu/',
    stints: [
      {
        years: '2024 – 2025',
        focus:
          'Script Fragmentation and Format: What Drives the English-Bengali Performance Gap in Open LLMs?',
        cite: 'Bhowmik, S. et al. · arXiv 2507.23248 · 2025',
        detail:
          'Bengali is spoken by more than 230 million people, yet there was no standard way to evaluate LLMs on it. We released 8 English benchmarks translated into Bengali and evaluated 10 open LLMs on paired inputs. Part of the gap turns out to be a measurement artifact of exact-match scoring; the rest traces to tokenizers fragmenting the script.',
        results: [
          { value: '8', label: 'benchmarks released in Bengali' },
          { value: '10', label: 'open LLMs evaluated' },
          { value: '~5×', label: 'tokens per word vs English' },
        ],
        link: { label: 'Read the paper', href: 'https://arxiv.org/abs/2507.23248' },
      },
    ],
  },
  {
    id: 'rit-cs',
    org: 'RIT Computer Science',
    location: 'Rochester, NY',
    years: '2022 – 2024',
    stints: [
      {
        years: '2023 – 2024',
        focus: 'NSF-funded data-science learning',
        detail:
          'Rolled out an R sandbox and interactive R sessions alongside Python, with Thebe and Binder running version-locked kernels in the browser for reproducible labs.',
        results: [{ value: '+25%', label: 'student engagement' }],
      },
      {
        years: '2022',
        focus: 'Secret sharing for the energy grid',
        detail:
          'Simulated energy-grid communication with an improved Shamir’s Secret Sharing scheme on Raspberry Pis, and documented where practice falls short of the theory.',
        results: [],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'Fin-AI',
    summary: 'Reads the mood around a stock from its live price, news coverage and Reddit threads.',
    stack: ['Ollama', 'LangChain', 'Browserbase', 'Playwright', 'FastAPI'],
    links: [{ label: 'Code', href: 'https://github.com/ShimantoBhowmik/Fin-AI' }],
  },
  {
    name: 'Vision Voice',
    summary: 'Describes your surroundings in text and speech for people who are visually impaired.',
    stack: ['BLIP', 'Gemini', 'SpeechT5', 'FastAPI', 'Angular'],
    links: [
      { label: 'Code', href: 'https://github.com/ShimantoBhowmik/vision-voice' },
      { label: 'Devpost', href: 'https://devpost.com/software/visionvoice' },
    ],
  },
  {
    name: 'Note-ify',
    summary: 'Semantic search over academic notes.',
    stack: ['LangChain', 'Pinecone', 'MiniLM', 'Gemini', 'Streamlit'],
    links: [{ label: 'Live', href: 'https://noteify.streamlit.app/' }],
  },
  {
    name: 'aVeN-AI',
    summary: 'An AI customer support agent for Aven.',
    stack: ['Rust', 'React', 'Pinecone', 'Gemini', 'Playwright'],
    links: [{ label: 'Code', href: 'https://github.com/ShimantoBhowmik/aVeN' }],
  },
  {
    name: 'Zen-Code',
    summary: 'A coding agent that opens pull requests from requested changes.',
    stack: ['GitPython', 'GitHub API', 'Ollama'],
    links: [{ label: 'Code', href: 'https://github.com/ShimantoBhowmik/zen-code' }],
  },
  {
    name: 'Math Mania',
    summary:
      'A maths game I made for my niece, with a digit classifier trained from scratch. Where this all started.',
    stack: ['TensorFlow', 'JavaScript'],
    links: [
      { label: 'Live', href: 'https://shimantobhowmik.github.io/MathMania/' },
      { label: 'Code', href: 'https://github.com/ShimantoBhowmik/MathMania' },
    ],
  },
];

export const smallProjects: Project[] = [
  {
    name: 'Rust-shell',
    summary: 'A small UNIX shell.',
    stack: ['Rust'],
    links: [{ label: 'Code', href: 'https://github.com/ShimantoBhowmik/Rust-shell' }],
  },
  {
    name: 'packet-capture-analysis-tool',
    summary: 'Network metrics from ICMP packet captures.',
    stack: ['Python'],
    links: [
      { label: 'Code', href: 'https://github.com/ShimantoBhowmik/packet-capture-analysis-tool' },
    ],
  },
  {
    name: 'performance-metric-monitor',
    summary: 'System performance monitoring.',
    stack: ['Shell'],
    links: [
      { label: 'Code', href: 'https://github.com/ShimantoBhowmik/performance-metric-monitor' },
    ],
  },
  {
    name: 'Gemstone Classifier',
    summary: 'Gemstone classification with a fine-tuned ResNet-50.',
    stack: ['MATLAB'],
    links: [],
  },
  {
    name: 'Deshi Food',
    summary: 'A storefront for Bengali dishes.',
    stack: ['React', 'Redux', 'Firebase'],
    links: [
      { label: 'Live', href: 'https://dulcet-cassata-553237.netlify.app/' },
      { label: 'Code', href: 'https://github.com/ShimantoBhowmik/deshi-food-Typescript' },
    ],
  },
];

export const awards: Award[] = [
  {
    years: '2025',
    name: 'Outstanding Undergraduate Scholar Award',
    note: 'top 1% of undergraduates',
    from: 'RIT',
  },
  { years: '2018', name: 'Asia Pacific ICT Award (APICTA)', from: 'China' },
  { years: '2018', name: 'National ICT Award', from: 'BASIS, Bangladesh' },
  {
    years: '2024 – 2025',
    name: 'Leadership and service awards',
    note: 'Alfred L. & Ruby C. Davis Leadership (twice), International Student Service (twice), Excellence in Student Life',
    from: 'RIT',
  },
  {
    years: '2022 – 2025',
    name: 'Scholarships',
    note: 'Alumni Endowed Scholarship, Outstanding First-Year Student Scholarship',
    from: 'RIT',
  },
];

export const background: { years: string; line: string }[] = [
  { years: '2025', line: 'B.S. Computer Science, Rochester Institute of Technology.' },
  { years: '2023', line: 'Taught Python fundamentals in Stanford’s Code in Place.' },
  { years: '2022 – 2023', line: 'Ran hands-on research labs for RIT computing students.' },
];

// Bangla words that hang from each section's line. Keep them in this file so the font subset script finds them.
export const sections = {
  work: { en: 'Work', bn: 'কাজ' },
  research: { en: 'Research', bn: 'গবেষণা' },
  projects: { en: 'Projects', bn: 'প্রকল্প' },
  recognition: { en: 'Recognition', bn: 'সম্মাননা' },
  contact: { en: 'Contact', bn: 'যোগাযোগ' },
} as const;
