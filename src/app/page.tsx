import { Experience } from "@/features/Experience";
import { Featured } from "@/features/Featured";
import { FromTheBlog } from "@/features/FromTheBlog";
import { Home } from "@/features/Home";
import { Welcome } from "@/features/Welcome";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
    addressLocality: "London",
  },
  description:
    "Senior Manager at KPMG UK based in London, United Kingdom. Fifteen years building resilient digital platforms across legal technology, education, and AI.",
  image: "https://ketanrajpal.dev/og-image.png",
  jobTitle: "Senior Manager",
  name: "Ketan Rajpal",
  sameAs: [
    "https://www.linkedin.com/in/ketanrajpal",
    "https://github.com/ketanrajpal",
    "https://twitter.com/ketanrajpal",
  ],
  url: "https://ketanrajpal.dev",
  worksFor: {
    "@type": "Organization",
    name: "KPMG UK",
    url: "https://www.kpmg.com/uk",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        type="application/ld+json"
      />
      <div className="overflow-x-clip">
        <Welcome />
        <Home />
        <Experience />
        <Featured />
        <FromTheBlog />
      </div>
    </>
  );
}
