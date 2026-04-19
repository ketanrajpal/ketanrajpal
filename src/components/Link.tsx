import { IconData } from "@lineiconshq/free-icons";
import NextLink from "next/link";

import { Icon } from "./Icon";

export const Link = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: IconData;
  label: string;
}) => {
  return (
    <NextLink
      className="group border-2 rounded-full px-5 py-3 flex items-center gap-2 border-primary hover:bg-primary hover:text-white transition-colors"
      href={href}
    >
      <Icon color="currentColor" icon={icon} size={30} />
      <span className="text-lg font-semibold">{label}</span>
    </NextLink>
  );
};
