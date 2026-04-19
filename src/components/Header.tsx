"use client";

import { Comment1TextSolid } from "@lineiconshq/free-icons";

import { Link } from "./Link";
import { Logo } from "./Logo";
import { Mode } from "./Mode";

export const Header = () => {
  return (
    <header className="w-full absolute top-0 left-0">
      <div className="container mx-auto py-10 flex items-center justify-between">
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
