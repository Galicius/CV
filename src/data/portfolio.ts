export type Project = {
  id: number;
  title: string;
  subtitle: { en: string; sl: string };
  description: { en: string; sl: string };
  status: { en: string; sl: string };
  period: { en: string; sl: string };
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
  name: "Gal Guštin",
  title: "Full-Stack Developer",
  subtitle: {
    en: "Full-stack developer building polished web experiences and practical mobile products.",
    sl: "Full-stack razvijalec, ki ustvarja dovršene spletne izkušnje in praktične mobilne produkte."
  },
  location: "Maribor / Celje, Slovenia",
  email: "gal.gustin@gmail.com",
  phone: "+386 40 596 474",
  whatsapp: "40596474",
  github: "https://github.com/Galicius",
  about: {
    en: "I am a Master's student at FERI focused on computer science and data technologies. I like shipping useful digital products, solving messy technical problems, and turning ideas into interfaces that feel clear and reliable. My strongest work sits at the intersection of frontend craft, product thinking, and full-stack execution.",
    sl: "Sem študent magistrskega študija na FERI, smer Računalništvo in informacijske tehnologije. Rad ustvarjam uporabne digitalne produkte, rešujem zahtevne tehnične probleme in spreminjam ideje v vmesnike, ki so jasni in zanesljivi. Moje najboljše delo se nahaja na presečišču frontend razvoja, produktnega razmišljanja in full-stack izvedbe."
  }
};

export const experiences = [
  {
    id: 1,
    role: { en: "Samsung Ambassador / Mobile Sales Specialist", sl: "Samsung Ambasador / Prodajni svetovalec za mobilno telefonijo" },
    company: "Samsung",
    period: { en: "Jun 2022 - Mar 2026", sl: "Jun 2022 - Mar 2026" },
    location: { en: "Maribor, Slovenia", sl: "Maribor, Slovenija" },
    description: {
      en: "Advising customers on device purchases, subscriptions, and accessories while handling setup, data migration, and hands-on support.",
      sl: "Svetovanje strankam pri nakupu naprav, sklepanju naročnin in izbiri dodatne opreme, vključno z nastavitvijo, prenosom podatkov in tehnično pomočjo."
    }
  },
  {
    id: 2,
    role: { en: "Freelance Web Developer", sl: "Samostojni spletni razvijalec" },
    company: "Piranha Cocktail Bar / Alja Fakin",
    period: { en: "2025 - 2026", sl: "2025 - 2026" },
    location: { en: "Slovenia", sl: "Slovenija" },
    description: {
      en: "Designed and built freelance websites for Piranha Cocktail Bar and lawyer Alja Fakin, focusing on strong presentation, clear structure, and polished frontend execution.",
      sl: "Oblikovanje in razvoj spletnih strani za Piranha Cocktail Bar in odvetnico Aljo Fakin, s poudarkom na močni vizualni predstavitvi, jasni strukturi in dovršeni frontend izvedbi."
    }
  },
  {
    id: 3,
    role: { en: "Mobile Services & Devices Sales", sl: "Prodaja mobilnih storitev in naprav" },
    company: "SGERM d.o.o.",
    period: { en: "Sep 2021 - Dec 2021", sl: "Sep 2021 - Dec 2021" },
    location: { en: "Maribor, Slovenia", sl: "Maribor, Slovenija" },
    description: {
      en: "Sold telecom plans, mobile devices, and accessories while helping customers choose the right setup for everyday use.",
      sl: "Prodaja telekomunikacijskih paketov, mobilnih naprav in dodatne opreme ter svetovanje strankam pri izbiri optimalnih rešitev za vsakodnevno rabo."
    }
  },
];

export const education = [
  {
    id: 1,
    degree: {
      en: "Master of Engineering in Computer Science and Data Technologies",
      sl: "Magister inženir računalništva in informacijskih tehnologij"
    },
    institution: "FERI",
    period: { en: "Oct 2024 - Present", sl: "Okt 2024 - Trenutno" },
    location: { en: "Maribor, Slovenia", sl: "Maribor, Slovenija" },
    level: "EQF Level 7",
    url: "https://feri.um.si",
  },
  {
    id: 2,
    degree: {
      en: "Graduate Engineer of Computer Science and Communication Technologies",
      sl: "Diplomirani inženir računalništva in informacijskih tehnologij"
    },
    institution: "FERI",
    period: { en: "Sep 2020 - Sep 2024", sl: "Sep 2020 - Sep 2024" },
    location: { en: "Maribor, Slovenia", sl: "Maribor, Slovenija" },
    level: "EQF Level 6",
    url: "https://feri.um.si",
  },
  {
    id: 3,
    degree: { en: "High School Graduate", sl: "Maturant" },
    institution: { en: "First Gymnasium in Celje", sl: "I. gimnazija v Celju" },
    period: { en: "Aug 2016 - Jun 2020", sl: "Avg 2016 - Jun 2020" },
    location: { en: "Celje, Slovenia", sl: "Celje, Slovenija" },
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
    name: { en: "English", sl: "Angleščina" },
    keyName: "English",
    level: { en: "C1", sl: "C1" },
    skills: { listening: "C2", reading: "C2", production: "C2", interaction: "C2", writing: "C2" },
  },
  {
    name: { en: "Slovenian", sl: "Slovenščina" },
    keyName: "Slovenian",
    level: { en: "Native", sl: "Materni jezik" },
    skills: { listening: "Native", reading: "Native", production: "Native", interaction: "Native", writing: "Native" },
  },
  {
    name: { en: "German", sl: "Nemščina" },
    keyName: "German",
    level: { en: "B1", sl: "B1" },
    skills: { listening: "A2", reading: "B1", production: "B1", interaction: "A2", writing: "A2" },
  },
  {
    name: { en: "Russian", sl: "Ruščina" },
    keyName: "Russian",
    level: { en: "A2", sl: "A2" },
    skills: { listening: "A2", reading: "A1", production: "A2", interaction: "A2", writing: "A1" },
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Alja Fakin",
    subtitle: {
      en: "Brand and service website",
      sl: "Znamčna in storitvena spletna stran"
    },
    description: {
      en: "A polished marketing site built to present the brand clearly, support trust quickly, and give visitors an immediate sense of style and quality.",
      sl: "Dovršena marketinška stran, ustvarjena za jasno predstavitev znamke, vzpostavitev zaupanja in posredovanje občutka za stil ter kvaliteto."
    },
    status: { en: "Live", sl: "Aktivno" },
    period: { en: "2026", sl: "2026" },
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
    subtitle: {
      en: "Cocktail bar website",
      sl: "Spletna stran za cocktail bar"
    },
    description: {
      en: "A cocktail bar website I am especially proud of for its visual direction, strong atmosphere, and the careful image optimization work that keeps the experience rich without slowing it down.",
      sl: "Spletna stran za cocktail bar, na katero sem še posebej ponosen zaradi vizualne usmeritve, močnega vzdušja in skrbne optimizacije slik, ki ohranja bogato izkušnjo brez upočasnjevanja delovanja."
    },
    status: { en: "Live", sl: "Aktivno" },
    period: { en: "2026", sl: "2026" },
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
    subtitle: {
      en: "Informational product website",
      sl: "Informativna produktna spletna stran"
    },
    description: {
      en: "A practical service that scans all available driving lesson slots every 30 minutes, giving users fast, reliable insight into when new openings appear so they can request a slot at the right time. The backend runs on Google Cloud Run with a Python service handling the scanning workflow.",
      sl: "Praktična storitev, ki vsakih 30 minut pregleda vse proste termine za ure vožnje in uporabnikom omogoča hiter ter zanesljiv vpogled v nove termine, tako da lahko pravočasno rezervirajo vožnjo. Zaledni sistem (backend) teče na Google Cloud Run, kjer Python servis skrbi za proces skeniranja."
    },
    status: { en: "Live", sl: "Aktivno" },
    period: { en: "2026", sl: "2026" },
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
    subtitle: {
      en: "Web platform for photographers and clients",
      sl: "Spletna platforma za fotografe in stranke"
    },
    description: {
      en: "A full-stack university project focused on seamless communication between photographers and clients. It included authentication, profile management, booking flows, image uploads, reviews, and search filters based on location and services.",
      sl: "Full-stack univerzitetni projekt, osredotočen na nemoteno komunikacijo med fotografi in strankami. Vključeval je avtentikacijo, upravljanje profilov, procese rezervacij, nalaganje slik, ocene in iskalne filtre glede na lokacijo in storitve."
    },
    status: { en: "Academic", sl: "Akademski" },
    period: { en: "May 2021 - Jun 2021", sl: "Maj 2021 - Jun 2021" },
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
    subtitle: {
      en: "Shopping cart mobile app",
      sl: "Mobilna aplikacija za nakupovalni listek"
    },
    description: {
      en: "An Android app for barcode-based shopping list creation, product management, and price comparison across stores. Built in Java with Android Studio, backed by MySQL and cloud services, with team collaboration across both frontend and backend.",
      sl: "Android aplikacija za ustvarjanje nakupovalnih listkov s skeniranjem črtnih kod, upravljanje produktov in primerjavo cen med trgovinami. Narejena v Javi (Android Studio), podprta z MySQL in oblačnimi storitvami, s timskim sodelovanjem na frontend in backend delu."
    },
    status: { en: "Academic", sl: "Akademski" },
    period: { en: "May 2022 - Jun 2022", sl: "Maj 2022 - Jun 2022" },
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
    subtitle: {
      en: "AI assistant for FERI students and staff",
      sl: "AI asistent za študente in osebje FERI"
    },
    description: {
      en: "An AI-powered web application built with the ChatGPT API to help new FERI students find study information, timetable data, and professor contacts. The project covered architecture, frontend and backend implementation, QA with SonarQube, and team delivery using Scrum.",
      sl: "Z umetno inteligenco podprta spletna aplikacija, zgrajena s ChatGPT API-jem, ki novim študentom FERI pomaga pri iskanju študijskih informacij, urnikov in kontaktov profesorjev. Projekt je zajemal arhitekturo, frontend in backend implementacijo, QA s SonarQube in timsko delo z metodologijo Scrum."
    },
    status: { en: "Academic", sl: "Akademski" },
    period: { en: "Feb 2023 - Jun 2023", sl: "Feb 2023 - Jun 2023" },
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
    subtitle: {
      en: "Expo product search and management app",
      sl: "Expo aplikacija za iskanje in upravljanje produktov"
    },
    description: {
      en: "A React Native app built with Expo for product lookup, barcode scanning, expiration-date tracking, and real-time product search. It used Firebase for barcode and rating data and was developed collaboratively with Scrum.",
      sl: "React Native aplikacija, narejena z Expo, za iskanje produktov, skeniranje črtnih kod, sledenje rokom uporabnosti in iskanje produktov v realnem času. Uporabljena je bila baza Firebase za podatke o črtnih kodah in ocenah, projekt je bil razvit po metodologiji Scrum."
    },
    status: { en: "Academic", sl: "Akademski" },
    period: { en: "Nov 2022 - Jan 2023", sl: "Nov 2022 - Jan 2023" },
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
    subtitle: {
      en: "Service-oriented employee management support app",
      sl: "Aplikacija za podporo upravljanju zaposlenih (SOA)"
    },
    description: {
      en: "A service-oriented architecture project built around microservices, GraphQL, authentication, and Swagger documentation. I worked across backend and frontend integration to help deliver a modular, scalable employee management support system.",
      sl: "Projekt storitveno usmerjene arhitekture, osnovan na mikrostoritvah, GraphQL, avtentikaciji in Swagger dokumentaciji. Sodeloval sem pri integraciji backend in frontend delov ter pomagal pri izdelavi modularnega, razširljivega sistema za upravljanje zaposlenih."
    },
    status: { en: "Academic", sl: "Akademski" },
    period: { en: "Nov 2024 - Jan 2025", sl: "Nov 2024 - Jan 2025" },
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
    subtitle: {
      en: "Hackathon app for van life nomads",
      sl: "Hackathon aplikacija za 'van life' nomade"
    },
    description: {
      en: "A hackathon submission designed for van life nomads who wanted one place for community, dating, and practical help with van-related issues while on the road.",
      sl: "Hackathon izdelek, zasnovan za nomade v kombijih, ki so potrebovali eno mesto za skupnost, spoznavanje in praktično pomoč pri težavah s kombijem na poti."
    },
    status: { en: "Academic", sl: "Akademski" },
    period: { en: "Hackathon Project", sl: "Hackathon projekt" },
    featured: false,
    category: "study",
    showOnClientView: true,
    tech: ["Hackathon", "Community App", "Product Concept"],
    links: {
      live: "https://devpost.com/software/crossroads-y4ob5r",
    },
  },
];
