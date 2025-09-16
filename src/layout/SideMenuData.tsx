import { LayoutDashboard, User, UserRound } from "lucide-react";
import type { JSX } from "react";
// import Access from '../utils/Access';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
  hidden?: boolean;
  requiredPermission?: string; 
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const allMenuItems: SideLink[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
    requiredPermission: "CREATE_USER",
  },
  {
    title: "User Management",
    href: "user-management",
    icon: <User size={18} />,
    // requiredPermission: "MANAGE_USERS",
    sub: [
      {
        title: "User List",
        href: "/dashboard/user-management/user-list",
        icon: <User size={18} />,
        // requiredPermission: "VIEW_USERS"
      },
      {
        title: "User Role & Permission",
        href: "/dashboard/user-management/user-roles-permission",
        icon: <UserRound size={18} />,
        // requiredPermission: "MANAGE_ROLES"
      },
    ],
  },
];

// Filter menu items based on user permissions
export const sideMenuData = allMenuItems
  // .filter(item => 
  //   !item.requiredPermission || 
  //   // (item.requiredPermission && Access.hasPermission(item.requiredPermission))
  // )
  // .map(item => ({
  //   ...item,
  //   sub: item.sub?.filter(subItem => 
  //     !subItem.requiredPermission || 
  //     (subItem.requiredPermission && Access.hasPermission(subItem.requiredPermission))
  //   )
  // }));