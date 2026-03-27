import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Syne } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Gal Guštin | Full-Stack Developer",
  description:
    "Portfolio of Gal Guštin, a full-stack developer building web and mobile products with strong visual execution and practical product thinking.",
  keywords: ["Gal Guštin", "developer portfolio", "Next.js developer", "full-stack developer", "Slovenia"],
  openGraph: {
    title: "Gal Guštin | Full-Stack Developer",
    description: "Selected work, experience, and contact details for Gal Guštin.",
    type: "website",
  },
};

import { LanguageProvider } from "../context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${syne.variable} ${ibmPlexMono.variable}`}>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
