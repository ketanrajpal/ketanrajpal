export const CardHeading = ({ title }: { title: string }) => (
  <h3 className="font-serif font-medium leading-relaxed tracking-wide text-pretty text-lg md:text-xl lg:text-2xl">
    {title}
  </h3>
);

export const CardParagraph = ({ description }: { description: string }) => (
  <p className="text-base md:text-md lg:text-lg font-medium leading-loose text-pretty tracking-wide text-zinc-500">
    {description}
  </p>
);

export const CardTag = ({ tag }: { tag: string }) => (
  <div>
    <p className="inline-block rounded-lg bg-amber-300 p-1 px-3 font-bold uppercase tracking-wide text-black text-sm md:text-sm lg:text-base">
      {tag}
    </p>
  </div>
);
