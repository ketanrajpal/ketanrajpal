import { Story } from "@/features/Story";
import { Technologies } from "@/features/Technologies";
import { Welcome } from "@/features/Welcome";

export default function Home() {
  return (
    <>
      <Welcome />
      <Story />
      <Technologies />
    </>
  );
}
