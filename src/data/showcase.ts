/**
 * Content for the /new portfolio. One source for the page, the WebMCP tools
 * and the Jev fit check, so all three describe the same person.
 */

export const LANES = ["agents", "products", "mobile", "games", "client"] as const;
export type Lane = (typeof LANES)[number];

export const LANE_LABEL: Record<Lane, string> = {
  agents: "AI and agents",
  products: "Web products",
  mobile: "Mobile",
  games: "Games",
  client: "Client sites",
};

export const LANE_HINT: Record<Lane, string> = {
  agents: "Agent workflows, MCP tooling, decision models and retrieval.",
  products: "Full-stack web products with real users and real data.",
  mobile: "Expo and React Native apps for Android and iOS.",
  games: "Unreal Engine, Unity VR and real-world game systems.",
  client: "Websites built for businesses and people who pay for them.",
};

export type Status = "live" | "building" | "shipped" | "study";

export const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  building: "In progress",
  shipped: "Done",
  study: "Study project",
};

export type Work = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  status: Status;
  /** How strongly the piece belongs to each kind of work, 0 to 1. */
  mix: Partial<Record<Lane, number>>;
  summary: string;
  points: string[];
  stack: string[];
  link?: { href: string; label: string };
  preview?: { src: string; width: number; height: number };
};

export const profile = {
  name: "Gal Guštin",
  role: "Software developer",
  location: "Maribor, Slovenia",
  email: "hello@galgustin.com",
  github: "https://github.com/Galicius",
  cv: "/cv.pdf",
  lede:
    "I build web and mobile products. Most of the code is written by AI coding agents that I brief, review and test, so my time goes into deciding what to build and checking that it works.",
  about:
    "I'm studying for a master's in Computer Science and Data Technologies at FERI in Maribor. Before that I spent four years at Samsung, helping customers choose and set up their phones, which taught me to explain technical things simply.",
  languages: "Slovenian (native), English (C1), German (B1), Russian (A2)",
  education: "MSc Computer Science and Data Technologies, FERI (2024 to now). BSc, FERI (2020 to 2024).",
};

export const works: Work[] = [
  {
    slug: "layover",
    title: "Layover",
    kicker: "Hide and seek on public transport, for groups",
    year: "2026",
    status: "building",
    mix: { agents: 0.7, products: 0.7, mobile: 0.9, games: 0.9 },
    summary:
      "A phone companion for real-world Hide & Seek, Tag and Race on public transport. It shares only the positions each team may see, checks GPS distances, runs timers and deals cards.",
    points: [
      "Went from first commit to playable in one weekend: 102 commits, written with coding agents and reviewed before each merge.",
      "One pure rules reducer runs on the phones and on the authoritative Node server, so pass-and-play and online games cannot drift.",
      "OpenStreetMap answers for map questions, cached Overpass data, and reconnects that retry actions with stable IDs.",
      "Tested with simulated phones, full games of all three modes and a seeded ten-phone soak run.",
    ],
    stack: ["Expo SDK 58", "React Native", "Node", "WebSockets", "MapLibre", "OpenStreetMap"],
  },
  {
    slug: "driving-school",
    title: "Driving school app",
    kicker: "Booking app for a driving school and safe-driving centre",
    year: "2026",
    status: "building",
    mix: { products: 0.9, mobile: 1, agents: 0.5, client: 0.6 },
    summary:
      "Students book lessons, instructors run their day, admins assign people. Roles are enforced on the server, booking still works offline from a cached schedule, and every error reads in Slovenian.",
    points: [
      "425 commits since May, including 17 rounds of design directions compared side by side.",
      "Convex backend with password auth, lockout after repeated failures and an authorization table checked on every public function.",
      "Local backend mode with demo data, so a phone on the same Wi-Fi can test a real APK without any cloud account.",
    ],
    stack: ["Expo", "React Native", "Convex", "TypeScript", "Jest", "EAS"],
  },
  {
    slug: "spacefarmer",
    title: "SpaceFarmer",
    kicker: "A farming game in space, in Unreal Engine 5",
    year: "2026",
    status: "building",
    mix: { games: 1, agents: 0.9 },
    summary:
      "A farming game in space where every machine is grown from plants. Props are modelled in Blender Python, assets are edited through Unreal's MCP endpoint, and Windows builds are made on a second machine.",
    points: [
      "Authoring happens on Linux and builds on Windows, handed over through a shared drive.",
      "Props are scripted and reproducible in Blender Python, so any model can be regenerated from its source.",
      "Perforce with small, described changelists.",
    ],
    stack: ["Unreal Engine 5", "C++", "Unreal MCP", "Blender Python", "Perforce"],
  },
  {
    slug: "cozy-cat-cafe",
    title: "Cozy Cat Cafe",
    kicker: "Two-player co-op café game with cats and dogs",
    year: "2026",
    status: "building",
    mix: { games: 1 },
    summary:
      "A local co-op game set in an isometric pixel-art café. One player is a cat, the other a dog, and together they serve drinks to customers against the clock, each on their own half of a split screen.",
    points: [
      "Made in Unity at the ISWINT 2026 game jam in Timișoara, Romania.",
      "Split-screen co-op with a round timer and a shared queue of customer orders.",
      "Free builds for Windows and Linux on itch.io.",
    ],
    stack: ["Unity", "C#", "Pixel art", "Local co-op"],
    link: { href: "https://sarschi.itch.io/cozy-cat-cafe", label: "sarschi.itch.io" },
    preview: { src: "/previews/cozycatcafe-top.webp", width: 1600, height: 1000 },
  },
  {
    slug: "vozniski",
    title: "Vozniski",
    kicker: "Finds open driving exam slots in Slovenia",
    year: "2026",
    status: "live",
    mix: { products: 1, mobile: 0.5, agents: 0.2 },
    summary:
      "A Python scanner on Google Cloud Run checks every driving and theory exam slot in Slovenia on a schedule. The web app filters them by region, town, category and translator, and emails subscribers when one opens.",
    points: [
      "Slots, users, subscriptions and learning sessions live in Convex; notifications go out through Resend.",
      "A companion Android app built with Expo reuses the same API, and the open slots are also published as a public API.",
      "AI agents can subscribe a visitor to slot alerts through the site's WebMCP tools.",
      "Bilingual (Slovenian and English) with light and dark themes.",
    ],
    stack: ["Next.js", "Python", "Cloud Run", "Convex", "Resend", "Expo"],
    link: { href: "https://vozniski.si", label: "vozniski.si" },
    preview: { src: "/previews/vozniski-top.webp", width: 1600, height: 1000 },
  },
  {
    slug: "oracle",
    title: "The Oracle",
    kicker: "A Magic 8 Ball answered by a decision model",
    year: "2026",
    status: "shipped",
    mix: { agents: 0.9, products: 0.5 },
    summary:
      "Ask a yes-or-no question by voice or text, then shake your phone. TypeSafe's Jev decision model classifies the answer and the ball shows its probability. Questions about playing video games always get a yes.",
    points: [
      "Decision model through Vercel AI Gateway, constrained to the fifteen classic answers.",
      "Device-motion shake detection and voice dictation where the browser supports it.",
      "Optional Convex history of every reading.",
    ],
    stack: ["Next.js", "AI SDK", "Jev", "Convex"],
  },
  {
    slug: "piranha",
    title: "Piranha",
    kicker: "Website for a cocktail bar",
    year: "2026",
    status: "live",
    mix: { client: 1, products: 0.3 },
    summary:
      "A dark, image-led site for a cocktail bar. Heavy photography stays fast because every image is sized, encoded and loaded with care.",
    points: [
      "Art direction and build from scratch.",
      "Image pipeline tuned so the atmosphere costs no load time.",
      "Table reservations by email through Resend, live Google reviews, and a QR code that takes guests straight to leaving a review.",
    ],
    stack: ["Next.js", "Image optimisation", "Frontend design"],
    link: { href: "https://piranha.si", label: "piranha.si" },
    preview: { src: "/previews/piranha-top.webp", width: 1600, height: 1000 },
  },
  {
    slug: "aljafakin",
    title: "Alja Fakin",
    kicker: "Website for a law practice",
    year: "2026",
    status: "live",
    mix: { client: 1 },
    summary:
      "A calm, trustworthy site that tells a visitor in seconds who the lawyer is, what she handles and how to reach her.",
    points: ["Structure and copy built around the first question a client asks.", "Responsive from phone to desktop."],
    stack: ["WordPress", "Elementor", "Responsive UI"],
    link: { href: "https://aljafakin.si", label: "aljafakin.si" },
    preview: { src: "/previews/aljafakin-top.webp", width: 1600, height: 1000 },
  },
  {
    slug: "museum-guide",
    title: "Museum guide",
    kicker: "3D wayfinding on your phone, as a research prototype",
    year: "2026",
    status: "building",
    mix: { products: 0.8, mobile: 0.7, games: 0.4 },
    summary:
      "A phone guide that shows a museum floor as a simple 3D map. Visitors scan a QR code to confirm where they are, and the app draws the shortest route to the exhibit they want. It was built to test whether 3D wayfinding beats paper brochures and ordinary websites.",
    points: [
      "Single-floor 3D map in Three.js, with routes found by A* search.",
      "Location comes from QR scans, and the map never pretends to track you live.",
      "Designed for visitors of every age and level of digital confidence.",
    ],
    stack: ["React", "TypeScript", "Three.js", "Vite"],
  },
  {
    slug: "coloredmind",
    title: "ColoredMind",
    kicker: "A calm, offline journal",
    year: "2026",
    status: "building",
    mix: { mobile: 1, products: 0.4 },
    summary:
      "A private journal that turns each day into a muted field of colour, with your own small drawings hidden inside. Everything stays on the phone.",
    points: [
      "Drawing and colour fields rendered with React Native Skia.",
      "Works offline, with no account and no server.",
    ],
    stack: ["Expo SDK 57", "React Native Skia", "Zustand", "TypeScript"],
  },
  {
    slug: "fold4-linux",
    title: "Linux on a Fold4",
    kicker: "Porting Omarchy Linux to a spare foldable phone",
    year: "2026",
    status: "building",
    mix: { mobile: 0.6, agents: 0.5 },
    summary:
      "An experiment in running Omarchy, a desktop Linux setup, on a spare Samsung Galaxy Z Fold4. That means building a mainline Linux kernel for the phone's Snapdragon chip, describing its hardware in a new device tree, and getting past Samsung's bootloader checks.",
    points: [
      "The kernel, a tiny init program and the Android boot images are built from scratch and flashed over USB.",
      "Three of the five test images got past the bootloader's \"official binaries only\" check. None has reached the screen yet.",
      "Along the way: restoring stock Android on demand, and a USB internet relay so the phone can reach Samsung's servers.",
    ],
    stack: ["Linux kernel", "Device tree", "Clang", "Heimdall", "Omarchy"],
  },
  {
    slug: "t3-failover",
    title: "Usage failover",
    kicker: "Keeps agent threads running when an account hits its limit",
    year: "2026",
    status: "shipped",
    mix: { agents: 1 },
    summary:
      "A small tool for T3 Code. When a thread stops because its account is out of usage, it moves the thread to another account of the same provider and tells it to continue. If every account is limited, it waits for the one that resets first.",
    points: [
      "Talks to the running T3 server over its WebSocket RPC and MCP tools, like the T3 command line does.",
      "Has a dry-run mode and only touches threads that stopped recently.",
    ],
    stack: ["Node.js", "T3 Code", "MCP"],
  },
  {
    slug: "knowledge",
    title: "Knowledge Assistant",
    kicker: "Answers from internal documents, with citations",
    year: "2026",
    status: "shipped",
    mix: { agents: 1, products: 0.4 },
    summary:
      "A Slovenian assistant over 32 internal documents about driving schools and mobility companies. It retrieves with BM25, answers in Slovenian and cites document, section and date for every claim.",
    points: [
      "Runs fully offline and deterministic by default, with no keys and no model calls.",
      "Optional model synthesis and a web check for public facts, switched on explicitly.",
    ],
    stack: ["Python", "BM25", "RAG", "Slovenian NLP"],
  },
  {
    slug: "workout",
    title: "Workout Together",
    kicker: "Turns a YouTube workout into an editable routine",
    year: "2026",
    status: "building",
    mix: { mobile: 1, products: 0.6, agents: 0.4 },
    summary:
      "Paste a YouTube workout and get a timestamped routine you can edit, then share it with friends. Built on Expo with a Convex social layer.",
    points: [
      "Custom builder with reps, time per rep, rounds and body-area tags.",
      "Friend requests, workout forwarding and a shared inbox.",
    ],
    stack: ["Expo SDK 57", "React Native", "Convex"],
  },
  {
    slug: "crossroads",
    title: "Crossroads",
    kicker: "Hackathon app for people who live in their vans",
    year: "2026",
    status: "study",
    mix: { mobile: 0.6, products: 0.5 },
    summary:
      "A hackathon entry that gives van-life travellers one place for community, dating and practical help with their vans while on the road.",
    points: ["Built as an Expo app during a hackathon.", "Submitted on Devpost."],
    stack: ["Expo", "React Native", "TypeScript"],
    link: { href: "https://devpost.com/software/crossroads-y4ob5r", label: "Devpost" },
  },
  {
    slug: "feribot",
    title: "FERIbot",
    kicker: "A chat assistant for new FERI students",
    year: "2023",
    status: "study",
    mix: { agents: 0.7, products: 0.4 },
    summary:
      "A 2023 team project that answered new FERI students' questions about study programmes, timetables and professors using the ChatGPT API.",
    points: ["Architecture, frontend and backend, with SonarQube quality gates.", "Delivered in Scrum sprints."],
    stack: ["Python", "Flask", "OpenAI API"],
    link: { href: "https://gitlab.com/GalGustin/feribot", label: "GitLab" },
  },
];

export const workBySlug = new Map(works.map((w) => [w.slug, w]));

/** Works that belong to a kind of work, strongest first. `null` is everything, in listed order. */
export function worksFor(lane: Lane | null): Work[] {
  if (!lane) return works;
  return works
    .filter((w) => (w.mix[lane] ?? 0) >= 0.5)
    .sort((a, b) => (b.mix[lane] ?? 0) - (a.mix[lane] ?? 0));
}

/**
 * Measured on 23 Nov 2026 from T3 Code's state databases on Linux and the
 * Windows backup (threads merged by id), and from T3's usage scan caches on
 * both machines (rows deduplicated). Cost uses T3's own formula with the
 * LiteLLM list prices T3 downloads, at standard speed.
 */
export const t3 = {
  since: "May 2026",
  threads: 1331,
  spawnedByAgents: 1053,
  worktrees: 573,
  months: [
    { month: "May", threads: 14 },
    { month: "Jun", threads: 5 },
    { month: "Jul", threads: 11 },
    { month: "Aug", threads: 36 },
    { month: "Sep", threads: 23 },
    { month: "Oct", threads: 757 },
    { month: "Nov", threads: 485, partial: true },
  ],
  families: "Codex 57%, Claude Code 27% and OpenCode 15%",
  tokens: {
    since: "28 July 2026",
    total: 10.6e9,
    cachedShare: 0.97,
    calls: 69489,
    apiCostUsd: 3177,
    months: [
      { month: "Jul", tokens: 9e6, partial: true },
      { month: "Aug", tokens: 212e6 },
      { month: "Sep", tokens: 172e6 },
      { month: "Oct", tokens: 5886e6 },
      { month: "Nov", tokens: 4318e6, partial: true },
    ],
    split: "Codex 61%, Claude 39%",
  },
  notes: [
    "The driving school app's first version ran as five parallel workstreams, one of them a separate security review.",
    "Its interface was scored screen by screen and reworked until every screen scored at least 8.5 out of 10.",
    "SpaceFarmer is written on Linux and built on Windows. Agents on each side leave notes for each other on a shared drive.",
    "When an account runs out of usage, the failover tool above moves the thread to another account and resumes it.",
  ],
};
