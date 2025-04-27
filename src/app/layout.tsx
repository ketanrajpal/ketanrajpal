import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ketan Rajpal - Web Developer & Digital Designer",
  description:
    "A portfolio website showcasing my work as a web developer and digital designer.",
};

import "./app.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
