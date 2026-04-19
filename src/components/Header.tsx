"use client";

import { Comment1TextSolid } from "@lineiconshq/free-icons";

import { Link } from "./Link";
import { Logo } from "./Logo";
import { Mode } from "./Mode";

export const Header = () => {
  return (
    <header className="w-full md:absolute md:top-0 md:left-0">
      <div className="container mx-auto flex items-center justify-between px-6 py-6 md:px-0 md:py-8 lg:py-10">
        <Logo size={50} />
        <div className="flex items-center gap-8">
          <Link
            href="mailto:ketanrajpal@gmail.com"
            icon={Comment1TextSolid}
            label="Let's Talk"
          />

          <Mode />
        </div>
      </div>
    </header>
  );
};
