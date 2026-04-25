import { Experience } from "@/features/Experience";
import { Featured } from "@/features/Featured";
import { Footer } from "@/features/Footer";
import { Home } from "@/features/Home";
import { Technologies } from "@/features/Technologies";

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <Home />
      <Experience />
      <Featured />
      <Technologies />
      <Footer />
    </div>
  );
}
