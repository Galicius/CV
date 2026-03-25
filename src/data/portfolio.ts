export const personal = {
  name: "Gal Guštin",
  title: "Computer Science & Communication Technologies",
  subtitle: "Full-Stack Developer · Mobile Engineer · CS Student at FERI",
  dob: "22/08/2001",
  nationality: "Slovenian",
  location: "Maribor / Celje, Slovenia",
  email: "gal.gustin@gmail.com",
  phone: "+386 40 596 474",
  whatsapp: "40596474",
  github: "https://github.com/Galicius",
  facebook: "https://www.facebook.com/gal.gustin",
  about: `I am currently enrolled as a Master's student at FERI, focusing on Computer Science and Data Technologies. My career objective is to secure a position where I can leverage my skills and knowledge effectively, contributing to significant projects while developing my own applications. I possess a proactive and amiable demeanour with strong communication skills, enabling me to collaborate effectively with colleagues and stakeholders. I am diligent, adept at problem-solving, and deeply passionate about working with computers and tackling new challenges.`,
};

export const experiences = [
  {
    id: 1,
    role: "Ambassador Samsung / Mobile Sales Specialist",
    company: "SGERM d.o.o.",
    period: "Jun 2022 – Present",
    location: "Maribor, Slovenia",
    description:
      "Selling Telekom's subscription services for mobile technologies, along with retailing a wide range of phone accessories. Offering professional guidance to customers on phone purchases, facilitating seamless data transfer to new devices, and expertly installing protective screen covers.",
  },
  {
    id: 2,
    role: "Mobile Services & Devices Sales",
    company: "SGERM d.o.o.",
    period: "Sep 2021 – Dec 2021",
    location: "Maribor, Slovenia",
    description:
      "Selling Telekom's subscription services for mobile and fixed-line technologies, retailing additional phone accessories and mobile devices on contract or outright. Providing customer consultations and installing protective equipment on phones.",
  },
  {
    id: 3,
    role: "Trolley Management",
    company: "SPAR Slovenija d.o.o.",
    period: "Jul 2018 – Aug 2018",
    location: "Celje, Slovenia",
    description:
      "Managing shopping carts at Citycenter SPAR store and segregating beverage bottles.",
  },
];

export const education = [
  {
    id: 1,
    degree: "Master of Engineering in Computer Science and Data Technologies",
    institution: "Faculty of Electrical Engineering, Computer Science, and Informatics (FERI)",
    period: "Oct 2024 – Present",
    location: "Maribor, Slovenia",
    level: "EQF Level 7",
    url: "https://feri.um.si",
  },
  {
    id: 2,
    degree: "Graduate Engineer of Computer Science and Communication Technologies",
    institution: "Faculty of Electrical Engineering, Computer Science, and Informatics (FERI)",
    period: "Sep 2020 – Sep 2024",
    location: "Maribor, Slovenia",
    level: "EQF Level 6",
    url: "https://feri.um.si",
  },
  {
    id: 3,
    degree: "High School Graduate",
    institution: "1st Gymnasium in Celje",
    period: "Aug 2016 – Jun 2020",
    location: "Celje, Slovenia",
    url: "https://www.prvagim.si",
  },
];

export const programmingSkills = [
  "JavaScript", "TypeScript", "Python", "Java", "PHP",
  "HTML", "CSS", "SQL",
];

export const frameworkSkills = [
  "React", "React Native", "Next.js", "Node.js", "Express.js",
  "Expo", "Three.js", "Flask",
];

export const databaseSkills = [
  "MySQL", "MongoDB", "Firebase", "MongoDB Atlas",
];

export const toolSkills = [
  "Git", "Android Studio", "VS Code", "Swagger", "SonarQube",
  "WordPress", "Wix", "MS Office",
];

export const deploymentSkills = [
  "Vercel", "DigitalOcean", "Google Cloud",
];

export const languages = [
  {
    name: "Slovenian",
    flag: "🇸🇮",
    level: "Native",
    skills: { listening: "Native", reading: "Native", production: "Native", interaction: "Native", writing: "Native" },
  },
  {
    name: "English",
    flag: "🇬🇧",
    level: "C1",
    skills: { listening: "C1", reading: "C1", production: "C1", interaction: "B2", writing: "B2" },
  },
  {
    name: "German",
    flag: "🇩🇪",
    level: "B1",
    skills: { listening: "A2", reading: "B1", production: "B1", interaction: "A2", writing: "A2" },
  },
  {
    name: "Russian",
    flag: "🇷🇺",
    level: "A2",
    skills: { listening: "A2", reading: "A1", production: "A2", interaction: "A2", writing: "A1" },
  },
];

export const projects = [
  {
    id: 1,
    title: "Piranha",
    subtitle: "piranha.si",
    period: "2024",
    description:
      "Live website and platform for Piranha.",
    tech: ["Web", "Design", "Deployment"],
    links: { live: "https://piranha.si" },
    iframeSrc: "https://piranha.si",
    featured: true,
    status: "Active",
  },
  {
    id: 2,
    title: "Vozniški Izpit",
    subtitle: "vozniski.si",
    period: "2024",
    description:
      "Platform for driving school candidates and instructors in Slovenia.",
    tech: ["Web", "Development"],
    links: { live: "https://vozniski.si" },
    iframeSrc: "https://vozniski.si",
    featured: true,
    status: "Active",
  },
  {
    id: 3,
    title: "Alja Fakin",
    subtitle: "aljafakin.si",
    period: "2023",
    description:
      "Personal and professional portfolio.",
    tech: ["Web", "Design"],
    links: { live: "https://aljafakin.si" },
    iframeSrc: "https://aljafakin.si",
    featured: true,
    status: "Active",
  },
  {
    id: 4,
    title: "CrossRoads",
    subtitle: "Nomad networking platform",
    period: "2025 – 2026",
    description:
      "A community-focused nomad networking platform showcasing advanced React Native architecture patterns with native stack navigation, nested bottom tabs, web support, deep linking, and theme support.",
    tech: ["React Native", "Expo", "TypeScript", "React Navigation"],
    links: { github: "https://github.com/Galicius/CrossRoads" },
    featured: true,
    status: "Completed",
  },
];
