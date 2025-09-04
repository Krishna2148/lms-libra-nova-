import useCheckActiveNav from "@/hooks/UseCheckActiveNav";
import type { SideLink } from "../SideMenuData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible";


interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: SideLink[];
  closeNav: () => void;
}

interface NavLinkProps extends SideLink {
  subLink?: boolean;
  closeNav: () => void;
}

function NavLinkIcon({ title, icon, label, href, closeNav }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  const isFileManagerLink = href.includes("files/filemanager");
  const isActive = checkActiveNav(href);

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={href}
          onClick={closeNav}
          target={isFileManagerLink ? "_blank" : undefined}
          rel={isFileManagerLink ? "noopener noreferrer" : undefined}
          className={cn(
            "flex items-center justify-center h-10 w-10 rounded-lg transition-colors",
            isActive
              ? "bg-white text-blue-600 shadow-md"
              : "text-blue-100 hover:bg-blue-600 hover:text-white"
          )}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-2  text-black bg-orange-200 border-0">
        {title}
        {label && (
          <span className="ml-auto text-blue-200 text-xs">{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

function NavLinkIconDropdown({
  title,
  icon,
  label,
  sub,
  isOpen,
  toggleDropdown,
  closeNav,
}: NavLinkProps & { isOpen: boolean; toggleDropdown: () => void }) {
  const { checkActiveNav } = useCheckActiveNav();
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-lg transition-colors",
                isChildActive
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-blue-100 hover:bg-blue-600 hover:text-white"
              )}
              onClick={toggleDropdown}
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2 bg-orange-200 text-black border-0">
          {title}{" "}
          {label && (
            <span className="ml-auto text-blue-200 text-xs">{label}</span>
          )}
          <ChevronDown size={14} className={cn("transition-transform", isOpen ? "rotate-180" : "")} />
        </TooltipContent>
      </Tooltip>
      {isOpen && (
        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={4}
          className="bg-blue-200 border-blue-200 text-blue-900"
        >
          <DropdownMenuLabel className="text-blue-800 font-semibold">
            {title} {label ? `(${label})` : ""}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-blue-200" />
          {sub
            ?.filter((s) => !s.hidden)
            .map(({ title, icon, label, href }) => {
              const isActive = checkActiveNav(href);
              return (
                <DropdownMenuItem
                  key={`${title}-${href}`}
                  asChild
                  className={cn(
                    "rounded-md  hover:bg-white focus:text-blue-900",
                    isActive ? "bg-blue-100 text-blue-800" : ""
                  )}
                >
                  <Link
                    to={href}
                    onClick={closeNav}
                    target={
                      href.includes("files/filemanager") ? "_blank" : undefined
                    }
                    rel={
                      href.includes("files/filemanager")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <span className={cn("mr-2", isActive ? "text-blue-600" : "text-blue-500")}>
                      {icon}
                    </span>
                    <span className="ml-2 max-w-52 text-wrap">{title}</span>
                    {label && <span className="ml-auto text-xs bg-blue-200 text-blue-700 px-1.5 py-0.5 rounded">{label}</span>}
                  </Link>
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default function Nav({
  links,
  isCollapsed,
  className,
  closeNav,
}: NavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const renderLink = ({ sub, hidden, ...rest }: SideLink) => {
    if (hidden) return null;

    const key = `${rest.title}-${rest.href}`;
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
          isOpen={openDropdown === rest.title}
          toggleDropdown={() => handleDropdownToggle(rest.title)}
        />
      );

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (sub)
      return (
        <NavLinkDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
          isOpen={openDropdown === rest.title}
          toggleDropdown={() => handleDropdownToggle(rest.title)}
        />
      );

    return <NavLink {...rest} key={key} closeNav={closeNav} />;
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "group py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 ",
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className="mx-auto grid w-[95%] gap-1 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:px-2">
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  );
}

interface NavLinkProps extends SideLink {
  subLink?: boolean;
  closeNav: () => void;
}

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  const isFileManagerLink = href.includes("files/filemanager");
  const isActive = checkActiveNav(href);

  return (
    <Link
      to={href}
      onClick={closeNav}
      target={isFileManagerLink ? "_blank" : undefined}
      rel={isFileManagerLink ? "noopener noreferrer" : undefined}
      className={cn(
        "flex items-center h-10 px-3 rounded-lg transition-colors",
        isActive
          ? "bg-blue-800 text-white shadow-md font-medium"
          : "text-white hover:bg-blue-800 ",
        subLink && "h-8 text-sm ml-2"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={cn("mr-3", isActive ? "text-white" : "text-white")}>
        {icon}
      </span>
      <span className="flex-1 truncate">{title}</span>
      {label && (
        <span className={cn(
          "ml-2 rounded-md px-2 py-0.5 text-xs",
          isActive
            ? "bg-blue-100 text-blue-700"
            : "bg-blue-500 text-white"
        )}>
          {label}
        </span>
      )}
    </Link>
  );
}

function NavLinkDropdown({
  title,
  icon,
  label,
  sub,
  closeNav,
  isOpen,
  hidden,
  toggleDropdown,
}: NavLinkProps & { isOpen: boolean; toggleDropdown: () => void }) {
  const { checkActiveNav } = useCheckActiveNav();
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

  useEffect(() => {
    if (isChildActive && !isOpen) {
      toggleDropdown();
    }
  }, [isChildActive]);

  if (hidden) return null;

  return (
    <Collapsible open={isOpen} className="relative">
      <CollapsibleTrigger
        onClick={toggleDropdown}
        className={cn(
          "flex items-center justify-between w-full h-10 px-3 rounded-lg transition-colors cursor-pointer",
          isChildActive
            ? "bg-white text-blue-600 shadow-md font-medium"
            : "text-blue-100 hover:bg-blue-500 hover:text-white"
        )}
      >
        <div className="flex items-center">
          <span className={cn("mr-3", isChildActive ? "text-blue-600" : "text-blue-200")}>
            {icon}
          </span>
          <span className="flex-1 truncate text-left">{title}</span>
          {label && (
            <span className={cn(
              "ml-2 rounded-md px-2 py-0.5 text-xs",
              isChildActive
                ? "bg-blue-100 text-blue-700"
                : "bg-blue-500 text-white"
            )}>
              {label}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-200 ml-2",
            isOpen ? "rotate-180" : ""
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${(sub?.filter(a => !a.hidden).length || 0) * 40}px` : "0",
        }}
      >
        <div className="pl-6 pt-1 space-y-1">
          {sub
            ?.filter((a) => !a.hidden)!
            .map((sublink) => (
              <NavLink {...sublink} key={sublink.title} subLink closeNav={closeNav} />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}