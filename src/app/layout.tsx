import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getLang } from "../lib/i18n";
import "./globals.css";

// One variable grotesque (weight + width axes) for everything typographic,
// one variable mono for indices and metadata. latin-ext covers š, č, ž.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jetbrains",
});

const description =
  "Portfolio of Gal Guštin, a full-stack developer building web and mobile products with strong visual execution and practical product thinking.";

export const metadata: Metadata = {
  title: "Gal Guštin | Full-Stack Developer",
  description,
  keywords: ["Gal Guštin", "developer portfolio", "Next.js developer", "full-stack developer", "Slovenia"],
  openGraph: {
    title: "Gal Guštin | Full-Stack Developer",
    description: "Selected work, experience, and contact details for Gal Guštin.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0d" },
    { media: "(prefers-color-scheme: light)", color: "#f1eee7" },
  ],
};

// Runs before first paint: stored choice, else the system preference.
const themeScript = `(function(){try{var d=document.documentElement,s=localStorage.getItem("theme"),t=s==="light"||s==="dark"?s:matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})()`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await getLang();

  return (
    <html lang={lang} className={`${archivo.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
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
