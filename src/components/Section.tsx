export const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={`py-20 md:py-25 lg:py-30 ${className}`}>
      {children}
    </section>
  );
};
