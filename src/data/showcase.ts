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
  role: "AI engineer",
  job: {
    title: "AI engineer",
    company: "LANCom d.o.o.",
    since: "August 2026",
    summary:
      "We build client AI systems: RAG agents, ERP and Microsoft Copilot integrations, meeting assistants, and local models.",
  },
  location: "Maribor, Slovenia",
  email: "hello@galgustin.com",
  github: "https://github.com/Galicius",
  cv: "/cv.pdf",
  lede:
    "I build AI agents and business integrations at LANCom, alongside web and mobile products of my own.",
  about:
    "I'm studying for an MSc in Computer Science and Data Technologies at FERI in Maribor. Before LANCom, I spent four years at Samsung helping customers choose and configure phones.",
  languages: "Slovenian (native), English (C1), German (B1), Russian (A2)",
  education: "MSc Computer Science and Data Technologies, FERI (2024–present). BSc, FERI (2020–2024).",
};

export const works: Work[] = [
  {
    slug: "layover",
    title: "Layover",
    kicker: "Group hide-and-seek on public transport",
    year: "2026",
    status: "building",
    mix: { agents: 0.7, products: 0.7, mobile: 0.9, games: 0.9 },
    summary:
      "Companion app for real-world Hide & Seek, Tag, and Race on public transport. Enforces team visibility rules, checks GPS distances, runs timers, and deals cards.",
    points: [
      "Built to a playable state over one weekend using coding agents, with every diff reviewed before merge.",
      "A single pure rules reducer runs on both clients and the authoritative Node server so pass-and-play and online state cannot drift.",
      "Uses OpenStreetMap and cached Overpass data for map queries, with action retries using stable IDs on reconnect.",
      "Tested across all three modes with simulated clients and a seeded ten-phone soak test.",
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
      "Students book lessons, instructors manage schedules, and admins assign staff. Server functions enforce roles, cached schedules support offline booking, and error messages are in Slovenian.",
    points: [
      "Iterated through 17 UI directions side by side during development.",
      "Convex backend with password auth, lockout after repeated failures, and an authorization table checked on every public function.",
      "Includes a local backend mode with demo data so a phone on the same Wi-Fi can test an APK without a cloud account.",
    ],
    stack: ["Expo", "React Native", "Convex", "TypeScript", "Jest", "EAS"],
  },
  {
    slug: "spacefarmer",
    title: "SpaceFarmer",
    kicker: "Space farming game in Unreal Engine 5",
    year: "2026",
    status: "building",
    mix: { games: 1, agents: 0.9 },
    summary:
      "Space farming game where machinery grows from plants. Props are scripted in Blender Python, assets are edited over Unreal's MCP endpoint, and Windows builds run on a second machine.",
    points: [
      "Authored on Linux and built on Windows via a shared drive.",
      "Props are generated from Blender Python scripts so assets can be rebuilt from source.",
      "Versioned in Perforce with small, described changelists.",
    ],
    stack: ["Unreal Engine 5", "C++", "Unreal MCP", "Blender Python", "Perforce"],
  },
  {
    slug: "cozy-cat-cafe",
    title: "Cozy Cat Cafe",
    kicker: "Two-player split-screen co-op café game",
    year: "2026",
    status: "building",
    mix: { games: 1 },
    summary:
      "Local split-screen co-op game set in an isometric pixel-art café. One player controls a cat and the other a dog, serving drinks to customers against a round timer.",
    points: [
      "Built in Unity during the ISWINT 2026 game jam in Timișoara, Romania.",
      "Split-screen co-op with a round timer and a shared customer order queue.",
      "Free Windows and Linux builds on itch.io.",
    ],
    stack: ["Unity", "C#", "Pixel art", "Local co-op"],
    link: { href: "https://sarschi.itch.io/cozy-cat-cafe", label: "sarschi.itch.io" },
    preview: { src: "/previews/cozycatcafe-top.webp", width: 1600, height: 1000 },
  },
  {
    slug: "vozniski",
    title: "Vozniski",
    kicker: "Tracks open driving exam slots in Slovenia",
    year: "2026",
    status: "live",
    mix: { products: 1, mobile: 0.5, agents: 0.2 },
    summary:
      "Scheduled Python scanner on Google Cloud Run that checks driving and theory exam slots across Slovenia. The web app filters by region, town, category, and translator, and emails subscribers when a slot opens.",
    points: [
      "Stores slots, users, subscriptions, and learning sessions in Convex; sends notifications through Resend.",
      "Includes a companion Expo Android app sharing the same API, plus a public API for open slots.",
      "Exposes WebMCP tools so AI agents can subscribe a visitor to slot alerts.",
      "Slovenian and English UI with light and dark themes.",
    ],
    stack: ["Next.js", "Python", "Cloud Run", "Convex", "Resend", "Expo"],
    link: { href: "https://vozniski.si", label: "vozniski.si" },
    preview: { src: "/previews/vozniski-top.webp", width: 1600, height: 1000 },
  },
  {
    slug: "oracle",
    title: "The Oracle",
    kicker: "Decision-model Magic 8 Ball",
    year: "2026",
    status: "shipped",
    mix: { agents: 0.9, products: 0.5 },
    summary:
      "Yes-or-no Magic 8 Ball triggered by shaking the phone after asking by voice or text. TypeSafe's Jev decision model selects the answer and shows its probability; questions about playing video games always return yes.",
    points: [
      "Calls the decision model through Vercel AI Gateway, constrained to the 15 classic responses.",
      "Uses device-motion shake detection and browser voice dictation where supported.",
      "Optional Convex history of readings.",
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
      "Dark, photography-led site for a cocktail bar, with sized and encoded images so heavy photography loads quickly.",
    points: [
      "Custom layout, art direction, and frontend build from scratch.",
      "Email table reservations via Resend, live Google reviews, and a direct review QR code.",
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
      "Site for a law practice presenting the lawyer's background, practice areas, and contact details upfront.",
    points: [
      "Structured so prospective clients immediately see practice areas and contact options.",
      "Responsive layout across mobile and desktop.",
    ],
    stack: ["WordPress", "Elementor", "Responsive UI"],
    link: { href: "https://aljafakin.si", label: "aljafakin.si" },
    preview: { src: "/previews/aljafakin-top.webp", width: 1600, height: 1000 },
  },
  {
    slug: "museum-guide",
    title: "Museum guide",
    kicker: "Mobile 3D museum wayfinding prototype",
    year: "2026",
    status: "building",
    mix: { products: 0.8, mobile: 0.7, games: 0.4 },
    summary:
      "Mobile research prototype that renders a museum floor as a 3D map. Visitors scan a QR code to confirm their location and get the shortest route to an exhibit. Built to test whether 3D wayfinding outperforms paper brochures and standard websites.",
    points: [
      "Single-floor 3D map in Three.js with A* pathfinding.",
      "Positioning relies on explicit QR scans rather than simulated live tracking.",
    ],
    stack: ["React", "TypeScript", "Three.js", "Vite"],
  },
  {
    slug: "coloredmind",
    title: "ColoredMind",
    kicker: "Offline visual journal",
    year: "2026",
    status: "building",
    mix: { mobile: 1, products: 0.4 },
    summary:
      "Private mobile journal where each day is stored as a colour field paired with small drawings. All data stays on the phone.",
    points: [
      "Drawings and colour fields rendered with React Native Skia.",
      "Runs offline with no account and no backend.",
    ],
    stack: ["Expo SDK 57", "React Native Skia", "Zustand", "TypeScript"],
  },
  {
    slug: "fold4-linux",
    title: "Linux on a Fold4",
    kicker: "Porting Omarchy Linux to a Galaxy Z Fold4",
    year: "2026",
    status: "building",
    mix: { mobile: 0.6, agents: 0.5 },
    summary:
      "Porting the Omarchy desktop Linux setup to a Samsung Galaxy Z Fold4. Involves compiling a mainline Linux kernel for its Snapdragon chip, writing a device tree for the hardware, and passing Samsung's bootloader checks.",
    points: [
      "Builds the kernel, minimal init program, and Android boot images from source and flashes them over USB.",
      "Three of five test images passed the bootloader's official-binaries check; display bring-up is still pending.",
      "Includes on-demand stock Android restoration and a USB internet relay so the device can reach Samsung's servers.",
    ],
    stack: ["Linux kernel", "Device tree", "Clang", "Heimdall", "Omarchy"],
  },
  {
    slug: "t3-failover",
    title: "Usage failover",
    kicker: "Automatic account failover for T3 Code",
    year: "2026",
    status: "shipped",
    mix: { agents: 1 },
    summary:
      "Helper tool for T3 Code. When a thread stops on an account usage limit, it moves the thread to another account on the same provider and resumes it. If every account is limited, it waits for the one that resets first.",
    points: [
      "Talks to the running T3 server over WebSocket RPC and MCP tools.",
      "Includes a dry-run mode and only touches recently stopped threads.",
    ],
    stack: ["Node.js", "T3 Code", "MCP"],
  },
  {
    slug: "knowledge",
    title: "Knowledge Assistant",
    kicker: "Document Q&A with source citations",
    year: "2026",
    status: "shipped",
    mix: { agents: 1, products: 0.4 },
    summary:
      "Slovenian Q&A assistant over 32 internal documents for driving schools and mobility companies. Retrieves with BM25, answers in Slovenian, and cites document, section, and date for every claim.",
    points: [
      "Runs offline and deterministically by default, with no API keys or model calls.",
      "Supports opt-in model synthesis and public web verification.",
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
      "Converts a YouTube workout link into a timestamped, editable routine you can share with friends. Built with Expo and Convex.",
    points: [
      "Custom routine editor with reps, time per rep, rounds, and body-area tags.",
      "Friend requests, workout forwarding, and a shared inbox.",
    ],
    stack: ["Expo SDK 57", "React Native", "Convex"],
  },
  {
    slug: "crossroads",
    title: "Crossroads",
    kicker: "Hackathon app for van-life travellers",
    year: "2026",
    status: "study",
    mix: { mobile: 0.6, products: 0.5 },
    summary:
      "Hackathon prototype combining community, dating, and practical help with van issues on the road.",
    points: ["Built with Expo during a hackathon.", "Submitted on Devpost."],
    stack: ["Expo", "React Native", "TypeScript"],
    link: { href: "https://devpost.com/software/crossroads-y4ob5r", label: "Devpost" },
  },
  {
    slug: "feribot",
    title: "FERIbot",
    kicker: "Chat assistant for incoming FERI students",
    year: "2023",
    status: "study",
    mix: { agents: 0.7, products: 0.4 },
    summary:
      "2023 team project that answered incoming FERI students' questions about study programmes, timetables, and professors using the ChatGPT API.",
    points: ["Architecture, frontend, and backend with SonarQube quality gates.", "Delivered in Scrum sprints."],
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
    "The driving school app's first version ran across five parallel workstreams, including a dedicated security review.",
    "Each screen in that app was scored and reworked until all screens reached at least 8.5 out of 10.",
    "SpaceFarmer is authored on Linux and built on Windows, with agents on both sides coordinating via notes on a shared drive.",
    "When an account hits a usage limit, the failover tool listed above moves the thread to another account and resumes it.",
  ],
};
