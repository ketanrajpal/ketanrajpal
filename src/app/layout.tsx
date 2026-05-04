import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import { LenisProvider } from "@/components/LenisProvider";

import "./globals.css";
import { Footer } from "@/features/Footer";
import { Header } from "@/features/Header";
import { Scroll } from "@/features/Scroll";
import { Technologies } from "@/features/Technologies";

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
    types: {
      "application/rss+xml": "https://ketanrajpal.dev/rss.xml",
    },
  },
  authors: [{ name: "Ketan Rajpal", url: "https://ketanrajpal.dev" }],
  category: "Technology",
  creator: "Ketan Rajpal",
  description:
    "Portfolio of Ketan Rajpal — Senior Manager at KPMG UK based in London, United Kingdom, specialising in legal technology, education technology, and AI. Fifteen years shipping resilient, scalable digital platforms that keep working when stakes are high.",
  icons: {
    apple: [{ sizes: "180x180", url: "/apple-icon.png" }],
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
    "Software Portfolio",
    "London Developer",
    "Agentic AI",
    "LLM Integration",
    "Freelance full stack developer London",
    "Senior software engineer for hire UK",
    "Custom web application development",
    "React and Django developer UK",
    "AI integration developer",
    "Enterprise platform development",
    "Legal technology developer UK",
    "Education technology developer",
    "Cloud migration consultant",
    "Bespoke software development London",
  ],
  metadataBase: new URL("https://ketanrajpal.dev"),
  openGraph: {
    description:
      "Senior Manager at KPMG UK, based in London, United Kingdom. Fifteen years building resilient digital platforms across legal technology, education, and AI.",
    images: [
      {
        alt: "Ketan Rajpal — Senior Engineer",
        height: 941,
        url: "/og-image.png",
        width: 1672,
      },
    ],
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
      "Senior Manager at KPMG UK, based in London, United Kingdom. Fifteen years building resilient digital platforms across legal technology, education, and AI.",
    images: ["/og-image.png"],
    title: "Ketan Rajpal | Senior Engineer",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
      <head>
        <link href="https://cdn.sanity.io" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://cdn.sanity.io"
          rel="dns-prefetch"
        />
        <link
          href="https://ketanrajpal.dev/rss.xml"
          rel="alternate"
          title="Ketan Rajpal RSS Feed"
          type="application/rss+xml"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ketan Rajpal",
              potentialAction: {
                "@type": "SearchAction",
                "query-input": "required name=search_term_string",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://ketanrajpal.dev/blog?q={search_term_string}",
                },
              },
              url: "https://ketanrajpal.dev",
            }),
          }}
          type="application/ld+json"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W9X7WRP');`,
          }}
          id="gtm-script"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full">
        <noscript>
          <iframe
            height="0"
            src="https://www.googletagmanager.com/ns.html?id=GTM-W9X7WRP"
            style={{ display: "none", visibility: "hidden" }}
            width="0"
          />
        </noscript>
        <LenisProvider>
          <main>
            <Scroll />
            <Header />
            {children}
            <Technologies />
            <Footer />
          </main>
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
