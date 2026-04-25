import { Experience } from "@/features/Experience";
import { Featured } from "@/features/Featured";
import { Footer } from "@/features/Footer";
import { Home } from "@/features/Home";
import { Scroll } from "@/features/Scroll";
import { Technologies } from "@/features/Technologies";
import { Welcome } from "@/features/Welcome";

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <Scroll />
      <Welcome />
      <Home />
      <Experience />
      <Featured />
      <Technologies />
      <Footer />
    </div>
  );
}
