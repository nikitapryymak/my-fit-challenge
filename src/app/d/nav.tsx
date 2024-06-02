"use client";

import { Dumbbell, UserRoundSearch } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DASHBOARD_PATH } from "@/constants";
import UserMenu from "./user-menu";

const links = [
  {
    label: "Challenges",
    href: `/${DASHBOARD_PATH}`,
    icon: <Dumbbell size={20} />,
  },
  {
    label: "People",
    href: `/${DASHBOARD_PATH}/people`,
    icon: <UserRoundSearch size={20} />,
  },
];

export default function Nav() {
  const currentPath = usePathname();
  return (
    <nav className="w-[225px] pt-32 pb-6 px-4 flex flex-col border-r border-border rounded-none">
      <ul className="flex flex-col gap-1 flex-1">
        {links.map(({ label, href, icon }) => (
          <li
            key={href}
            className={`flex items-center p-2 cursor-pointer hover:bg-muted ${
              currentPath === href ? "bg-muted" : ""
            }`}
          >
            {icon}
            <Link className="ml-3" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <UserMenu />
    </nav>
  );
}
