import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gal Guštin — Developer Portfolio",
  description:
    "Gal Guštin — Computer Science & Communication Technologies student at FERI. Full-stack developer specializing in React Native, Next.js, and modern web technologies.",
  keywords: "Gal Guštin, developer, portfolio, React Native, Next.js, FERI, computer science",
  openGraph: {
    title: "Gal Guštin — Developer Portfolio",
    description: "Computer Science student & full-stack developer building mobile and web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/png;base64,iVBORw0KGgo=" />
      </head>
      <body>{children}</body>
    </html>
  );
}
