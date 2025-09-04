import { LayoutDashboard, User, UserRound } from "lucide-react";
import type { JSX } from "react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
  hidden?: boolean;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sideMenuData: SideLink[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
 {
    title: "User Management",
    href: "user-management",
    icon: <User size={18} />,
    sub: [
      {
        title: "User List",
        href: "/dashboard/user-management/user-list",
        icon: <User size={18} />,
      },
      {
        title: "User Role & Permission",
        href: "/dashboard/user-management/user-roles-permission",
        icon: <UserRound size={18} />,
      },
    ],
  },
]