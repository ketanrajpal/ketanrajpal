import Image from "next/image";

import ProfileImage from "@/images/ketan-rajpal.jpg";

export const Home = () => {
  return (
    <section className="flex min-h-screen items-center overflow-hidden">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 md:gap-12">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-10 shrink-0 bg-black block" />
          <h2 className="text-lg font-medium tracking-wide md:text-2xl">
            I&apos;m Ketan Rajpal
          </h2>
        </div>

        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-0">
          <h1 className="font-serif text-[clamp(3.5rem,12vw,10rem)] font-medium leading-none tracking-wide">
            Senior
          </h1>
          <Image
            alt="Ketan Rajpal"
            className="h-24 w-24 rotate-2 rounded-3xl object-cover sm:h-32 sm:w-32 md:h-40 md:w-40"
            src={ProfileImage}
          />
          <h1 className="font-serif text-[clamp(3.5rem,12vw,10rem)] font-medium leading-none tracking-wide">
            Engineer
          </h1>
        </div>

        <p className="max-w-3xl text-gray-500 leading-loose font-medium sm:text-lg md:text-xl lg:text-2xl text-pretty tracking-wide">
          I design and build durable digital products across legal technology,
          education, and AI. Fifteen years shipping platforms that keep working
          when stakes are high. The code stays invisible. The impact
          doesn&apos;t.
        </p>
      </div>
    </section>
  );
};
