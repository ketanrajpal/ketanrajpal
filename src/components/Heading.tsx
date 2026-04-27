export const Heading = ({
  description,
  title,
}: {
  description: string;
  title: string;
}) => {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 p-6 pt-15 md:max-w-2xl md:gap-12 md:px-0 md:pt-0 lg:max-w-3xl">
      <div className="flex flex-col gap-8">
        <h2 className="font-serif text-2xl font-medium tracking-wide md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
          {title}
        </h2>
        <p className="text-base font-medium leading-loose text-pretty tracking-wide sm:text-lg md:text-xl lg:text-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};
