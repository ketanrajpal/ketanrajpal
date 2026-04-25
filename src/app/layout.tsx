import type { Metadata } from "next";

import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  description:
    "Portfolio of Ketan Rajpal, senior engineer building resilient products across legal technology, education, and AI.",
  title: "Ketan Rajpal | Senior Engineer",
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
      </body>
    </html>
  );
}
