"use client";

import { CircleUser, LogOut, Settings, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/actions";
import useSession from "@/lib/supabase/useSession";
import { DASHBOARD_PATH } from "@/constants";
import Link from "next/link";

const links = [
  {
    label: "Profile",
    href: `/${DASHBOARD_PATH}/profile`,
    icon: <CircleUser size={16} />,
  },
  {
    label: "Settings",
    href: `/${DASHBOARD_PATH}/settings`,
    icon: <Settings size={16} />,
  },
];

const MenuItem = ({ children }: { children: React.ReactNode }) => (
  <DropdownMenuItem className="my-1 cursor-pointer gap-2">
    {children}
  </DropdownMenuItem>
);

export default function UserMenu() {
  const session = useSession();

  return session ? (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center w-full p-2 cursor-pointer hover:bg-muted ">
            <UserRound size={18} />
            <span className="ml-3">{session.user.email}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          side="right"
          sideOffset={-14}
          align="end"
        >
          {links.map(({ label, href, icon }) => (
            <Link key={href} href={href}>
              <MenuItem>
                {icon}
                <span>{label}</span>
              </MenuItem>
            </Link>
          ))}
          <MenuItem>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <LogOut size={16} />
              <input
                type="submit"
                value="Sign Out"
                className="cursor-pointer"
              />
            </form>
          </MenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : null;
}
