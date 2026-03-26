export type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  status: "Live" | "Academic";
  period: string;
  featured: boolean;
  tech: string[];
  previewImg?: string;
  category: "client" | "study";
  showOnClientView?: boolean;
  links: {
    live: string;
    github?: string;
  };
};

export const personal = {
  name: "Gal Gustin",
  title: "Full-Stack Developer",
  subtitle: "Full-stack developer building polished web experiences and practical mobile products.",
  location: "Maribor / Celje, Slovenia",
  email: "gal.gustin@gmail.com",
  phone: "+386 40 596 474",
  whatsapp: "40596474",
  github: "https://github.com/Galicius",
  about:
    "I am a Master's student at FERI focused on computer science and data technologies. I like shipping useful digital products, solving messy technical problems, and turning ideas into interfaces that feel clear and reliable. My strongest work sits at the intersection of frontend craft, product thinking, and full-stack execution.",
};

export const experiences = [
  {
    id: 1,
    role: "Samsung Ambassador / Mobile Sales Specialist",
    company: "Samsung",
    period: "Jun 2022 - Mar 2026",
    location: "Maribor, Slovenia",
    description:
      "Advising customers on device purchases, subscriptions, and accessories while handling setup, data migration, and hands-on support.",
  },
  {
    id: 2,
    role: "Freelance Web Developer",
    company: "Piranha Cocktail Bar / Alja Fakin",
    period: "2025 - 2026",
    location: "Slovenia",
    description:
      "Designed and built freelance websites for Piranha Cocktail Bar and lawyer Alja Fakin, focusing on strong presentation, clear structure, and polished frontend execution.",
  },
  {
    id: 3,
    role: "Mobile Services & Devices Sales",
    company: "SGERM d.o.o.",
    period: "Sep 2021 - Dec 2021",
    location: "Maribor, Slovenia",
    description:
      "Sold telecom plans, mobile devices, and accessories while helping customers choose the right setup for everyday use.",
  },
];

export const education = [
  {
    id: 1,
    degree: "Master of Engineering in Computer Science and Data Technologies",
    institution: "FERI",
    period: "Oct 2024 - Present",
    location: "Maribor, Slovenia",
    level: "EQF Level 7",
    url: "https://feri.um.si",
  },
  {
    id: 2,
    degree: "Graduate Engineer of Computer Science and Communication Technologies",
    institution: "FERI",
    period: "Sep 2020 - Sep 2024",
    location: "Maribor, Slovenia",
    level: "EQF Level 6",
    url: "https://feri.um.si",
  },
  {
    id: 3,
    degree: "High School Graduate",
    institution: "First Gymnasium in Celje",
    period: "Aug 2016 - Jun 2020",
    location: "Celje, Slovenia",
    url: "https://www.prvagim.si",
  },
];

export const programmingSkills = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "PHP",
  "SQL",
];

export const frameworkSkills = [
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "Express.js",
  "Expo",
  "Three.js",
];

export const databaseSkills = ["MySQL", "MongoDB", "Firebase", "MongoDB Atlas"];

export const toolSkills = [
  "Bun",
  "Git",
  "Android Studio",
  "VS Code",
  "Swagger",
  "SonarQube",
  "WordPress",
];

export const deploymentSkills = ["Vercel", "Google Cloud"];

export const languages = [
  {
    name: "Slovenian",
    level: "Native",
    skills: { listening: "Native", reading: "Native", production: "Native", interaction: "Native", writing: "Native" },
  },
  {
    name: "English",
    level: "C1",
    skills: { listening: "C1", reading: "C1", production: "C1", interaction: "B2", writing: "B2" },
  },
  {
    name: "German",
    level: "B1",
    skills: { listening: "A2", reading: "B1", production: "B1", interaction: "A2", writing: "A2" },
  },
  {
    name: "Russian",
    level: "A2",
    skills: { listening: "A2", reading: "A1", production: "A2", interaction: "A2", writing: "A1" },
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Alja Fakin",
    subtitle: "Brand and service website",
    description:
      "A polished marketing site built to present the brand clearly, support trust quickly, and give visitors an immediate sense of style and quality.",
    status: "Live",
    period: "2026",
    featured: true,
    category: "client",
    tech: ["WordPress", "Elementor", "Responsive UI"],
    previewImg: "/previews/screencapture-aljafakin-si-2026-03-26-14_27_23.png",
    links: {
      live: "https://aljafakin.si",
    },
  },
  {
    id: 2,
    title: "Piranha",
    subtitle: "Cocktail bar website",
    description:
      "A cocktail bar website I am especially proud of for its visual direction, strong atmosphere, and the careful image optimization work that keeps the experience rich without slowing it down.",
    status: "Live",
    period: "2026",
    featured: true,
    category: "client",
    tech: ["Next.js", "Image Optimization", "Frontend Design"],
    previewImg: "/previews/screencapture-piranha-si-2026-03-26-14_27_51.png",
    links: {
      live: "https://piranha.si",
    },
  },
  {
    id: 3,
    title: "Vozniski",
    subtitle: "Informational product website",
    description:
      "A practical service that scans all available driving lesson slots every 30 minutes, giving users fast, reliable insight into when new openings appear so they can request a slot at the right time. The backend runs on Google Cloud Run with a Python service handling the scanning workflow.",
    status: "Live",
    period: "2026",
    featured: false,
    category: "client",
    tech: ["Next.js", "Python", "Google Cloud Run"],
    previewImg: "/previews/screencapture-vozniski-si-2026-03-26-14_28_25.png",
    links: {
      live: "https://vozniski.si",
    },
  },
  {
    id: 4,
    title: "Praktikum I",
    subtitle: "Web platform for photographers and clients",
    description:
      "A full-stack university project focused on seamless communication between photographers and clients. It included authentication, profile management, booking flows, image uploads, reviews, and search filters based on location and services.",
    status: "Academic",
    period: "May 2021 - Jun 2021",
    featured: true,
    category: "study",
    tech: ["Express.js", "MySQL", "Bookshelf.js"],
    links: {
      live: "https://gitlab.com/sarapetecin/fotografske_storitve",
    },
  },
  {
    id: 5,
    title: "Praktikum II",
    subtitle: "Shopping cart mobile app",
    description:
      "An Android app for barcode-based shopping list creation, product management, and price comparison across stores. Built in Java with Android Studio, backed by MySQL and cloud services, with team collaboration across both frontend and backend.",
    status: "Academic",
    period: "May 2022 - Jun 2022",
    featured: false,
    category: "study",
    tech: ["Java", "Android Studio", "MySQL"],
    links: {
      live: "https://gitlab.com/GalGustin/nakupovalni-listek/",
    },
  },
  {
    id: 6,
    title: "FERIbot",
    subtitle: "AI assistant for FERI students and staff",
    description:
      "An AI-powered web application built with the ChatGPT API to help new FERI students find study information, timetable data, and professor contacts. The project covered architecture, frontend and backend implementation, QA with SonarQube, and team delivery using Scrum.",
    status: "Academic",
    period: "Feb 2023 - Jun 2023",
    featured: true,
    category: "study",
    tech: ["Python", "Flask", "OpenAI API", "Bootstrap", "jQuery"],
    links: {
      live: "https://gitlab.com/GalGustin/feribot",
    },
  },
  {
    id: 7,
    title: "Times Up",
    subtitle: "Expo product search and management app",
    description:
      "A React Native app built with Expo for product lookup, barcode scanning, expiration-date tracking, and real-time product search. It used Firebase for barcode and rating data and was developed collaboratively with Scrum.",
    status: "Academic",
    period: "Nov 2022 - Jan 2023",
    featured: false,
    category: "study",
    tech: ["React Native", "Expo", "Firebase"],
    links: {
      live: "https://gitlab.com/jasa.virant/times-up",
    },
  },
  {
    id: 8,
    title: "RIRS",
    subtitle: "Service-oriented employee management support app",
    description:
      "A service-oriented architecture project built around microservices, GraphQL, authentication, and Swagger documentation. I worked across backend and frontend integration to help deliver a modular, scalable employee management support system.",
    status: "Academic",
    period: "Nov 2024 - Jan 2025",
    featured: false,
    category: "study",
    tech: ["Microservices", "GraphQL", "Swagger", "SOA"],
    links: {
      live: "https://github.com/tjasagumilar/RIRS",
    },
  },
  {
    id: 9,
    title: "Crossroads",
    subtitle: "Hackathon app for van life nomads",
    description:
      "A hackathon submission designed for van life nomads who wanted one place for community, dating, and practical help with van-related issues while on the road.",
    status: "Academic",
    period: "Hackathon Project",
    featured: false,
    category: "study",
    showOnClientView: true,
    tech: ["Hackathon", "Community App", "Product Concept"],
    links: {
      live: "https://devpost.com/software/crossroads-y4ob5r",
    },
  },
];
