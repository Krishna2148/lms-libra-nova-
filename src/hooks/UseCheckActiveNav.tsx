import type { SideLink } from "@/layout/SideMenuData";
import { useLocation } from "react-router-dom";

export default function useCheckActiveNav() {
  const location = useLocation();

  const checkActiveNav = (href: string, subLinks?: SideLink[]): boolean => {
    if (location.pathname === href) {
      return true;
    }

    if (href !== "/dashboard" && location.pathname.startsWith(`${href}/`)) {
      return true;
    }

    if (subLinks) {
      return subLinks.some((link) => checkActiveNav(link.href, link.sub));
    }

    return false;
  };

  return { checkActiveNav };
}
