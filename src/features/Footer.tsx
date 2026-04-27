import Image from "next/image";
import Link from "next/link";

import ProfileImage from "@/images/ketan-rajpal.jpg";

const socials = [
  {
    href: "https://www.linkedin.com/in/ketanrajpal/",
    label: "LinkedIn",
  },
  {
    href: "https://www.behance.net/ketanrajpal",
    label: "Behance",
  },
  {
    href: "https://www.github.com/ketanrajpal",
    label: "GitHub",
  },
];

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-8 py-8 md:gap-12 md:py-12 bg-slate-950">
      <Image
        alt="Ketan Rajpal"
        className="h-24 w-24 rounded-3xl object-cover sm:h-32 sm:w-32 md:h-40 md:w-40 rotate-2"
        src={ProfileImage}
      />
      <Link
        className=" font-semibold font-serif text-slate-300 tracking-wide text-3xl md:text-6xl"
        href="mailto:hello@ketanrajpal.dev"
      >
        hello@ketanrajpal.dev
      </Link>
      <div className="flex gap-3 md:gap-6">
        {socials.map((social) => (
          <Link
            className="bg-slate-300 p-2 px-5 rounded-lg font-semibold leading-wide tracking-wide hover:bg-slate-600 transition-colors hover:text-white"
            href={social.href}
            key={social.label}
            rel="noopener noreferrer"
            target="_blank"
          >
            {social.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-2 text-base font-bold tracking-wide items-center text-slate-300">
        <span>Made with</span>
        <span className="text-rose-500">
          <svg
            fill="none"
            height="30"
            transform="rotate(0 0 0)"
            viewBox="0 0 24 24"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8227 4.77222C9.5756 2.52515 5.93237 2.52515 3.6853 4.77222C1.43823 7.01929 1.43823 10.6625 3.6853 12.9096L10.409 19.6334C11.2877 20.5121 12.7123 20.5121 13.591 19.6334L20.3147 12.9097C22.5618 10.6626 22.5618 7.01939 20.3147 4.77232C18.0676 2.52525 14.4244 2.52525 12.1773 4.77232L12 4.94959L11.8227 4.77222Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span>by Ketan Rajpal</span>
      </div>
    </footer>
  );
};
