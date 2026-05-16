import { LenisProvider } from "@/components/LenisProvider";
import { Footer } from "@/features/Footer";
import { Header } from "@/features/Header";
import { Scroll } from "@/features/Scroll";
import { Technologies } from "@/features/Technologies";

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisProvider>
      <main>
        <Scroll />
        <Header />
        {children}
        <Technologies />
        <Footer />
      </main>
    </LenisProvider>
  );
}
