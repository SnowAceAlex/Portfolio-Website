import type { SlotImage } from "@/components/IllustrationSlot";

// Single source of truth for every piece of copy on the site.
// To add a project, a job or a journey stop, append to the arrays below.

export const site = {
  name: "Vinh Bui",
  fullName: "Bui Cong Vinh",
  handle: "Snow Ace",
  role: "Full-stack developer",
  email: "alexvinh2911@gmail.com",
  resume: "/Bui-Cong-Vinh-CV.pdf",
  github: "https://github.com/SnowAceAlex",
  linkedin: "https://www.linkedin.com/in/cong-vinh-bui/",
  description:
    "Vinh Bui is a full-stack developer and final-year Computer Science student at International University, VNU-HCMC.",
  tagline: "Cars, road trips, race weekends and leg day. Also, web apps.",
  intro:
    "Final-year Computer Science student at IU, VNU-HCMC. I build production web apps, most recently booking systems at Laztar, and I love cars, road trips and race weekends.",
  // `short` is the one-line version shown in the mobile profile panel (first two only).
  affiliations: [
    { at: "@IU, VNU-HCMC", what: "CS, class of 2027", short: "@IU, VNU-HCMC · CS '27" },
    { at: "prev @Laztar", what: "Software Engineer Intern", short: "prev @Laztar · SWE intern" },
    { at: "prev @NAB Vietnam", what: "Student Ambassador", short: "prev @NAB Vietnam · ambassador" },
  ],
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  // "01·A": shown as "EXIT 01·A" on cards and "No. 01·A" on the trip card.
  exitCode: string;
  scope: string;
  summary: string;
  // Leave `image` out until there is a screenshot; a hatched placeholder shows `placeholder` instead.
  image?: { src: string; width: number; height: number; alt: string };
  placeholder?: { long: string; short: string };
  stack: string[];
  highlights: string[];
  repoUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "zk-land-registry",
    title: "ZK Land Registry",
    kind: "Undergraduate thesis · blockchain",
    exitCode: "01·A",
    scope: "Solo · 96 commits",
    summary:
      "A land registry on blockchain where owners prove ownership, mortgages and transfers with zero-knowledge proofs, without revealing their records.",
    image: {
      src: "/zk-land-registry.jpg",
      width: 1713,
      height: 917,
      alt: "ZK Land Registry landing page, split into a Resident portal for proofs and a Government portal for officers",
    },
    stack: ["TypeScript", "Next.js", "NestJS", "Solidity", "Circom", "Hardhat", "PostgreSQL", "Prisma", "snarkjs"],
    highlights: [
      "An off-chain sparse Merkle tree with Groth16 zk-SNARKs, so owners can prove ownership, a clean mortgage status and transfer rights without disclosing their identity or records.",
      "Three Circom circuits (up to 28.2K R1CS constraints over a depth-24 Merkle tree): 660–1,133 ms to prove, 14–18 ms to verify, ~722 B per proof.",
      "Storage kept off Ethereum Sepolia so fees stay flat as the registry grows: ~115K gas per root update and ~250K–267K gas per proof verification.",
      "Proof lookups hold at ~10 ms p50 across 4.5M property records, and caching cut API p99 latency 96.5%, from 1,003 ms to 35 ms.",
      "Self-audited and closed 3 vulnerabilities (proof replay, an exposed public endpoint, a transfer-window ownership race); validated across 22 Sepolia rounds with 740 automated tests.",
    ],
    repoUrl: "https://github.com/SnowAceAlex/land-registry-zkp",
  },
  {
    slug: "instameow",
    title: "Instameow",
    kind: "Social media platform",
    exitCode: "01·B",
    scope: "Full-stack",
    summary:
      "An Instagram-style social app with a photo feed, profiles, search, bookmarks, notifications and messages.",
    image: {
      src: "/insta-meow.png",
      width: 1016,
      height: 782,
      alt: "Instameow home feed in dark mode, with the sidebar navigation and a photo post",
    },
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "Tailwind CSS", "Cloudinary"],
    highlights: [
      "REST API in Express backed by PostgreSQL, with Redis for caching.",
      "Image uploads and delivery handled through Cloudinary.",
      "React and Tailwind CSS frontend covering feed, profile, search and messaging views.",
    ],
    repoUrl: "https://github.com/SnowAceAlex/Social-Media-Project",
  },
  {
    slug: "libman",
    title: "LibMan",
    kind: "Library management system",
    exitCode: "01·C",
    scope: "Full-stack · team project",
    summary:
      "A team-built system for cataloging books and authors, tracking borrowers and managing loans and returns.",
    image: {
      src: "/lib-man.png",
      width: 1247,
      height: 624,
      alt: "LibMan landing page with the library hero banner and project introduction",
    },
    stack: ["Spring Boot", "Java", "React", "TypeScript"],
    highlights: [
      "Catalog of books and authors the whole library can search.",
      "Borrower records, plus loans tracked from checkout to return.",
      "Spring Boot REST API with a React + TypeScript frontend, built as a team with Git reviews.",
    ],
    repoUrl: "https://github.com/tnphucccc/LibMan",
  },
];

export type Job = {
  org: string;
  role: string;
  location: string;
  // Shown in the logbook strip instead of the location when set.
  mode?: string;
  start: string;
  end: string;
  months: number;
  about: string;
  points: string[];
  tech: string[];
  // The current or most relevant job gets the filled ink strip.
  primary?: boolean;
};

// Newest first; logbook entry numbers count up from the oldest.
export const experience: Job[] = [
  {
    org: "Laztar",
    role: "Software Engineer Intern",
    location: "Ho Chi Minh City",
    start: "Jun",
    end: "Aug 2026",
    months: 3,
    primary: true,
    about:
      "Digital transformation and SaaS company. Worked inside a 10–12 person engineering team on a live booking product.",
    points: [
      "Fixed composite-resource booking logic where creating one resource scheduled related resources elsewhere in the hierarchy, caught before production.",
      "Fixed an urgent concurrency bug where simultaneous bookings returned a generic server error, replacing a lock-based bottleneck with a database constraint check.",
      "Built client-side reconciliation for a network-drop edge case where a booking succeeded on the server but the response never reached the client, with no schema change needed.",
      "Standardised error handling across 2–3 core booking flows, so failures give actionable messages and no longer leave slots locked.",
      "Worked with Claude Code and Cursor daily: about 30% faster on routine work, usually shipping a ticket within one working session, while keeping full code-review ownership.",
    ],
    tech: ["TypeScript", "Next.js", "React Native / Expo", "NestJS", "Prisma", "C# / .NET 8", "ABP", "PostgreSQL", "Redis"],
  },
  {
    org: "NAB Innovation Centre Vietnam",
    role: "Student Ambassador · NAB Talent Connect",
    location: "Ho Chi Minh City",
    mode: "Part-time, remote",
    start: "Nov 2025",
    end: "Apr 2026",
    months: 6,
    about: "Part-time, remote, alongside final-year studies.",
    points: [
      "Represented NAB on campus for six months, talking with students about engineering culture and early-career paths.",
      "Completed the programme with a certificate.",
    ],
    tech: ["Communication", "Community", "Certificate"],
  },
];

export type JourneyStop = {
  km: number;
  date: string;
  title: string;
  body: string;
  // Hatched placeholder until `image` is delivered.
  illustration?: { label: string; image?: SlotImage };
};

export const journey: JourneyStop[] = [
  {
    km: 0,
    date: "Sep 2022",
    title: "Computer Science, B.Sc.",
    body: "International University, VNU-HCMC. Where the trip started. GPA 3.29, graduating March 2027.",
  },
  {
    km: 1,
    date: "May 2025",
    title: "Runner-up, IT Hackathon 2025",
    body: "Built and pitched with a team in the Solana Pragmatic track.",
    illustration: {
      label: "Illustration · pit lane\nthe hackathon crew around one laptop",
      image: {
        src: "/hackathon-2025-team.jpg",
        alt: "Vinh's team of five on stage at IT Hackathon 2025 with their medals and the runner-up prize board",
        position: "center 45%",
      },
    },
  },
  {
    km: 2,
    date: "Dec 2025",
    title: "Second runner-up, AI Thực Chiến 2025",
    body: "Applied AI competition hosted by IUAI.",
  },
  {
    km: 3,
    date: "2025 – 2026",
    title: "Academic scholarship",
    body: "Awarded for Semester II of the 2025–2026 academic year.",
  },
  {
    km: 4,
    date: "Aug 2026",
    title: "IELTS Academic 6.5",
    body: "British Council. Comfortable working, reviewing and presenting in English.",
  },
];

export const nextStop = {
  title: "Your team, maybe.",
  body: "Graduating March 2027. Looking for a team where I can keep learning and ship real products.",
};

export const tools = [
  "TypeScript",
  "JavaScript",
  "C#",
  "Java",
  "Next.js",
  "React",
  "React Native",
  "Expo",
  "NestJS",
  "Node.js",
  "Express",
  ".NET 8",
  "ABP",
  "Spring Boot",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Prisma",
  "Solidity",
  "Circom",
  "Hardhat",
  "Tailwind CSS",
  "Git",
  "GitHub Actions",
];

export const hobbies = ["Weight training (favourite)", "race weekends", "road trips"];

// Placeholder routine: replace with the real weekly split.
export const trainingSplit = [
  { day: "MON", focus: "PUSH" },
  { day: "TUE", focus: "PULL" },
  { day: "WED", focus: "LEGS" },
  { day: "THU", focus: "REST" },
  { day: "FRI", focus: "UPPER" },
  { day: "SAT", focus: "LOWER" },
  { day: "SUN", focus: "DRIVE" },
];

// The recruiter "Fast lane" drawer: the 20-second version.
export const fastLane = [
  { k: "ROLE", v: "Full-stack developer · TypeScript, C#/.NET" },
  { k: "EXPERIENCE", v: "Software Engineer Intern at Laztar (Jun–Aug 2026), booking systems in production" },
  { k: "STUDY", v: "B.Sc. Computer Science, IU VNU-HCMC, graduating Mar 2027 · GPA 3.29" },
  { k: "BUILDS WITH", v: "Next.js, NestJS, React Native/Expo, .NET 8, PostgreSQL, Redis, Prisma" },
  { k: "AWARDS", v: "Runner-up IT Hackathon 2025 · 2nd runner-up AI Thực Chiến 2025 · IELTS 6.5" },
  { k: "OFF THE CLOCK", v: hobbies.join(", ") },
  { k: "LOOKING FOR", v: "A graduate role on a team that ships real products" },
  { k: "CONTACT", v: "alexvinh2911@gmail.com · github.com/SnowAceAlex · linkedin.com/in/cong-vinh-bui" },
];
