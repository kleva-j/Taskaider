import { CollapsedNavItem, NavItem } from "@/authedLayout/nav-item";
import { UserProfile } from "@/authedLayout/user-profile";
import { LucideIcon } from "lucide-react";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    path: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 justify-between h-full"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <CollapsedNavItem key={index} {...link} />
          ) : (
            <NavItem key={index} {...link} />
          ),
        )}
      </nav>
      <div className="mx-auto">
        <UserProfile />
      </div>
    </div>
  );
}
