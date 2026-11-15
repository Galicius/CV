import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { themeScript } from "../lib/theme";
import "./globals.css";

// Display face: the name, headings and ledes. Variable weight + optical size.
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "WONK"],
  style: "normal",
  display: "swap",
  variable: "--font-fraunces",
});

const frauncesItalic = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "WONK"],
  style: "italic",
  preload: false,
  display: "swap",
  variable: "--font-fraunces-italic",
});

// Text face: body copy, navigation, buttons. Variable weight.
const schibsted = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-schibsted",
});

// Dates and metadata in the margins. One weight.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  preload: false,
  display: "swap",
  variable: "--font-plex-mono",
});

const description =
  "CV and portfolio of Gal Guštin, a full-stack developer and Master's student in Maribor, Slovenia, building web and mobile products.";

export const metadata: Metadata = {
  title: "Gal Guštin | Full-Stack Developer",
  description,
  keywords: ["Gal Guštin", "developer portfolio", "Next.js developer", "full-stack developer", "Slovenia"],
  authors: [{ name: "Gal Guštin" }],
  openGraph: {
    title: "Gal Guštin | Full-Stack Developer",
    description: "Selected work, experience, education and contact details for Gal Guštin.",
    type: "profile",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Gal Guštin | Full-Stack Developer",
    description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${frauncesItalic.variable} ${schibsted.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
