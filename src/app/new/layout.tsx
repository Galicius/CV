import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./new.css";

const host = Host_Grotesk({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--mn-font" });

const description =
  "Gal Guštin builds web and mobile products in Maribor, Slovenia, with AI coding agents doing most of the typing.";

export const metadata: Metadata = {
  title: "Gal Guštin",
  description,
  alternates: { canonical: "/new" },
  openGraph: { title: "Gal Guštin", description, type: "profile", url: "/new" },
  twitter: { card: "summary_large_image", title: "Gal Guštin", description },
};

export default function NewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`mn ${host.variable}`}>{children}</div>;
}
