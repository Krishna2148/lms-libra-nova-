import { BarChart3, Bookmark, BookOpenText, IdCard, LayoutDashboard, Library, User, UserCog, UserRoundCheck } from "lucide-react";
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
    title:"Book Management",
    href:"/admin/book-mgmt",
    icon:<BookOpenText size={18} />,
  },
  {
   title:"Borrow Books",
   href:"/admin/borrow-books",
   icon:<Library size={18} />,
  },
  {
    title:"Reservation",
    href:"/admin/reservation",
    icon:<Bookmark size={18} />,
  },
  {
    title:"Membership",
    href:"/admin/membership",
    icon:<IdCard size={18} />,
  },
  {
    title: "User Management",
    href: "user-mgmt",
    icon: <User size={18} />,
    // requiredPermission: "MANAGE_USERS",
    sub: [
      {
        title: "User List",
        href: "/admin/user-mgmt/users",
        icon: <UserRoundCheck size={18} />,
        // requiredPermission: "VIEW_USERS"
      },
      {
        title: "Role List",
        href: "/admin/user-mgmt/roles",
        icon: <UserCog size={18} />,
        // requiredPermission: "MANAGE_ROLES"
      },
    ],
  },
  {
    title:"Reports",
    href:"/admin/reports",
    icon:<BarChart3 size={18} />,
  }
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