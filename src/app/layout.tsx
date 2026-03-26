import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gal Gustin | Full-Stack Developer",
  description:
    "Portfolio of Gal Gustin, a full-stack developer building web and mobile products with strong visual execution and practical product thinking.",
  keywords: ["Gal Gustin", "developer portfolio", "Next.js developer", "full-stack developer", "Slovenia"],
  openGraph: {
    title: "Gal Gustin | Full-Stack Developer",
    description: "Selected work, experience, and contact details for Gal Gustin.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Syne:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
