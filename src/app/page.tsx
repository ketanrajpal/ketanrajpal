import { Experience } from "@/features/Experience";
import { Featured } from "@/features/Featured";
import { FromTheBlog } from "@/features/FromTheBlog";
import { Home } from "@/features/Home";
import { Welcome } from "@/features/Welcome";

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <Welcome />
      <Home />
      <Experience />
      <Featured />
      <FromTheBlog />
    </div>
  );
}
