import { metaData } from "@/utils/metadata";

import "./app.scss";

export async function generateMetadata() {
  const metadata = await metaData("home");

  return {
    ...metadata,
  };
}

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
