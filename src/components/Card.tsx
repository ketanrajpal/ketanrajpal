export const CardHeading = ({ title }: { title: string }) => (
  <h3 className="font-serif text-3xl font-medium leading-relaxed tracking-wide text-pretty">
    {title}
  </h3>
);

export const CardParagraph = ({ description }: { description: string }) => (
  <p className="text-lg font-medium leading-loose text-pretty tracking-wide text-zinc-500">
    {description}
  </p>
);

export const CardTag = ({ tag }: { tag: string }) => (
  <div>
    <p className="inline-block rounded-lg bg-amber-300 p-1 px-3 font-bold uppercase tracking-wide text-black">
      {tag}
    </p>
  </div>
);
