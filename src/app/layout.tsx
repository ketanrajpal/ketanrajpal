import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

import { LenisProvider } from "@/components/LenisProvider";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  alternates: {
    canonical: "https://ketanrajpal.dev",
  },
  authors: [{ name: "Ketan Rajpal", url: "https://ketanrajpal.dev" }],
  category: "Technology",
  creator: "Ketan Rajpal",
  description:
    "Portfolio of Ketan Rajpal — Senior Manager at KPMG UK specialising in legal technology, education technology, and AI. Fifteen years shipping resilient, scalable digital platforms that keep working when stakes are high.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  keywords: [
    "Ketan Rajpal",
    "Senior Engineer",
    "Senior Manager",
    "KPMG UK",
    "Legal Technology",
    "Education Technology",
    "AI Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Django",
    "GraphQL",
    "tRPC",
    "PostgreSQL",
    "AWS",
    "Google Cloud",
    "Azure",
    "Docker",
    "Tailwind CSS",
    "Software Portfolio",
    "London Developer",
    "Agentic AI",
    "LLM Integration",
  ],
  metadataBase: new URL("https://ketanrajpal.dev"),
  openGraph: {
    description:
      "Senior Manager at KPMG UK. Fifteen years building resilient digital platforms across legal technology, education, and AI.",
    locale: "en_GB",
    siteName: "Ketan Rajpal",
    title: "Ketan Rajpal | Senior Engineer",
    type: "website",
    url: "https://ketanrajpal.dev",
  },
  publisher: "Ketan Rajpal",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: "Ketan Rajpal | Senior Engineer",
    template: "%s | Ketan Rajpal",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ketanrajpal",
    description:
      "Senior Manager at KPMG UK. Fifteen years building resilient digital platforms across legal technology, education, and AI.",
    title: "Ketan Rajpal | Senior Engineer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${outfit.variable} ${jakarta.variable} h-full antialiased`}
      lang="en"
    >
      <body className="min-h-full">
        <LenisProvider>
          <main>{children}</main>
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
