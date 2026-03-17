export interface ExperienceItem {
  company: string;
  translationKey: string;
  startDate: string;
  endDate: string | null;
  icon: string;
}

export interface ProjectItem {
  name: string;
  translationKey: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface SkillItem {
  name: string;
  icon: string;
  translationKey: string;
}

export interface SkillCategory {
  translationKey: string;
  icon: string;
  skills: SkillItem[];
}

export interface CertificateItem {
  translationKey: string;
  date: string;
  credentialId: string;
  skills: string[];
}

export interface EducationItem {
  translationKey: string;
  startDate: string;
  endDate: string;
}

export interface StatisticYear {
  year: number;
  statistics: {
    translationKey: string;
    value: number;
    total: number;
  }[];
}

export interface RecommendationItem {
  translationKey: string;
  date: string;
  avatar: string;
}

export const experienceData: ExperienceItem[] = [
  {
    company: "NDA",
    translationKey: "NDAJob",
    startDate: "2024-07-01",
    endDate: null,
    icon: "mdi:briefcase-lock",
  },
  {
    company: "AdvantISS",
    translationKey: "AdvantISSJob",
    startDate: "2022-08-01",
    endDate: "2024-07-31",
    icon: "mdi:briefcase",
  },
  {
    company: "PasynSoft LLC",
    translationKey: "PasynSoftJob",
    startDate: "2020-02-01",
    endDate: "2022-07-31",
    icon: "mdi:briefcase-outline",
  },
  {
    company: "TechStudio",
    translationKey: "TechStudioJob",
    startDate: "2019-06-01",
    endDate: "2021-08-31",
    icon: "mdi:briefcase-variant-outline",
  },
];

export const projectsData: ProjectItem[] = [
  {
    name: "oh-blog",
    translationKey: "ohBlog",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    githubUrl: "https://github.com/o-holyshevskyi/oh-blog",
    liveUrl: "https://oholyshevskyi.com",
  },
  {
    name: "folders_synchronizator",
    translationKey: "folderSync",
    techStack: ["C#", ".NET", "File I/O"],
    githubUrl: "https://github.com/o-holyshevskyi/folders_synchronizator_three_thousands",
  },
  {
    name: "ClariSpend",
    translationKey: "clariSpend",
    techStack: ["React Native", "Expo", "TypeScript"],
    githubUrl: "https://github.com/o-holyshevskyi",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    translationKey: "languages",
    icon: "mdi:code-braces",
    skills: [
      { name: "C#", icon: "skill-icons:cs", translationKey: "c#" },
      { name: "TypeScript", icon: "skill-icons:typescript", translationKey: "typescript" },
      { name: "JavaScript", icon: "skill-icons:javascript", translationKey: "javascript" },
      { name: "Node.js", icon: "skill-icons:nodejs-light", translationKey: "nodejs" },
    ],
  },
  {
    translationKey: "testing",
    icon: "mdi:test-tube",
    skills: [
      { name: "Playwright", icon: "logos:playwright", translationKey: "playwright" },
      { name: "Selenium", icon: "skill-icons:selenium", translationKey: "selenium" },
      { name: "API Testing", icon: "mdi:api", translationKey: "api" },
      { name: "Postman", icon: "skill-icons:postman", translationKey: "postman" },
    ],
  },
  {
    translationKey: "devops",
    icon: "mdi:server-network",
    skills: [
      { name: "Git", icon: "skill-icons:git", translationKey: "git" },
      { name: "Docker", icon: "skill-icons:docker", translationKey: "docker" },
      { name: "SQL", icon: "vscode-icons:file-type-sql", translationKey: "sql" },
      { name: "Jira", icon: "devicon:jira", translationKey: "jira" },
    ],
  },
  {
    translationKey: "methodologies",
    icon: "mdi:strategy",
    skills: [
      { name: "Scrum", icon: "iconoir:agile", translationKey: "scrum" },
      { name: "Static Testing", icon: "fluent-mdl2:test-plan", translationKey: "staticTesting" },
      { name: "Software Testing", icon: "fluent-mdl2:test-auto-solid", translationKey: "softwareTesting" },
    ],
  },
];

export const certificatesData: CertificateItem[] = [
  {
    translationKey: "istqb",
    date: "2020-11",
    credentialId: "20-CTFL-181825-12",
    skills: ["Testing", "Manual Testing"],
  },
  {
    translationKey: "javascript",
    date: "2023-02",
    credentialId: "TP64118432",
    skills: ["JavaScript"],
  },
  {
    translationKey: "gitBases",
    date: "2023-03",
    credentialId: "TP25340100",
    skills: ["Git"],
  },
];

export const educationData: EducationItem[] = [
  {
    translationKey: "master",
    startDate: "2016-09",
    endDate: "2018-03",
  },
  {
    translationKey: "bachelor",
    startDate: "2012-09",
    endDate: "2016-05",
  },
];

export const statisticsData: StatisticYear[] = [
  {
    year: 2023,
    statistics: [
      { translationKey: "bugReports", value: 44, total: 255 },
      { translationKey: "tasks", value: 122, total: 858 },
      { translationKey: "commits", value: 981, total: 2789 },
      { translationKey: "tests", value: 234, total: 798 },
    ],
  },
  {
    year: 2022,
    statistics: [
      { translationKey: "bugReports", value: 55, total: 255 },
      { translationKey: "tasks", value: 147, total: 858 },
      { translationKey: "commits", value: 836, total: 2789 },
      { translationKey: "tests", value: 201, total: 798 },
    ],
  },
  {
    year: 2021,
    statistics: [
      { translationKey: "bugReports", value: 40, total: 255 },
      { translationKey: "tasks", value: 182, total: 858 },
      { translationKey: "commits", value: 495, total: 2789 },
      { translationKey: "tests", value: 165, total: 798 },
    ],
  },
  {
    year: 2020,
    statistics: [
      { translationKey: "bugReports", value: 48, total: 255 },
      { translationKey: "tasks", value: 273, total: 858 },
      { translationKey: "commits", value: 477, total: 2789 },
      { translationKey: "tests", value: 198, total: 798 },
    ],
  },
  {
    year: 2019,
    statistics: [
      { translationKey: "bugReports", value: 36, total: 255 },
      { translationKey: "tasks", value: 134, total: 858 },
    ],
  },
];

export const recommendationsData: RecommendationItem[] = [
  {
    translationKey: "3rd",
    date: "2024-01-31",
    avatar: "/avatars/avatar-3.jfif",
  },
  {
    translationKey: "1st",
    date: "2023-11-06",
    avatar: "/avatars/avatar-1.png",
  },
  {
    translationKey: "2nd",
    date: "2020-01-16",
    avatar: "/avatars/avatar-2.png",
  },
];
