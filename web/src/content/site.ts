// Single source of truth for every piece of copy on the site.
// To add a project or a journey stop, append to the arrays below.

export const site = {
  name: "Vinh Bui",
  fullName: "Bui Cong Vinh",
  handle: "Snow Ace",
  role: "Full-stack developer",
  email: "alexvinh2911@gmail.com",
  resume: "/cv.pdf",
  github: "https://github.com/SnowAceAlex",
  linkedin: "https://www.linkedin.com/in/cong-vinh-bui/",
  description:
    "Vinh Bui is a full-stack developer and final-year Computer Science student at International University, VNU-HCMC.",
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  image: { src: string; width: number; height: number; alt: string };
  stack: string[];
  highlights: string[];
  team?: boolean;
  repoUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "instameow",
    title: "Instameow",
    kind: "Social media platform",
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
      "Spring Boot backend for books, authors, borrowers and circulation records.",
      "React and TypeScript frontend for librarians and readers.",
      "Built in a team with Git-based code review.",
    ],
    team: true,
    repoUrl: "https://github.com/tnphucccc/LibMan",
  },
];

export type JourneyStop = {
  // Leave `when` empty until you have the real date; it is hidden when empty.
  when?: string;
  title: string;
  place?: string;
  body: string;
};

export const journey: JourneyStop[] = [
  {
    title: "Computer Science, B.Sc.",
    place: "International University, VNU-HCMC",
    body: "Where the trip started. Now in my final year, with the fundamentals packed in the trunk.",
  },
  {
    title: "Full-stack development",
    place: "Personal and university projects",
    body: "Built apps in TypeScript, JavaScript and Java with React, Next.js, Express and Spring Boot, on PostgreSQL and MySQL.",
  },
  {
    title: "Shipping with a team",
    place: "LibMan and agile course projects",
    body: "Worked in agile teams: Git workflows, code reviews, REST API contracts and deployments.",
  },
  {
    title: "Next stop",
    body: "Looking for a team where I can keep learning and ship real products.",
  },
];

export const toolbox = [
  { name: "TypeScript", icon: "siTypescript" },
  { name: "JavaScript", icon: "siJavascript" },
  { name: "Java", icon: "siOpenjdk" },
  { name: "React", icon: "siReact" },
  { name: "Next.js", icon: "siNextdotjs" },
  { name: "Node.js", icon: "siNodedotjs" },
  { name: "Express", icon: "siExpress" },
  { name: "Spring Boot", icon: "siSpringboot" },
  { name: "PostgreSQL", icon: "siPostgresql" },
  { name: "MySQL", icon: "siMysql" },
  { name: "Redis", icon: "siRedis" },
  { name: "Tailwind CSS", icon: "siTailwindcss" },
  { name: "Cloudinary", icon: "siCloudinary" },
  { name: "Git", icon: "siGit" },
] as const;
