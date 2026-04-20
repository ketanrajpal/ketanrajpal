"use client";

import { Comment1TextSolid } from "@lineiconshq/free-icons";
import NextLink from "next/link";

import { Link } from "./Link";
import { Logo } from "./Logo";
import { Mode } from "./Mode";

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full header-bg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <NextLink href="/">
          <Logo size={50} />
        </NextLink>
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
