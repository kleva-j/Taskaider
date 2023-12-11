"use client";

import UserProfile from "@/components/sidebar/user-profile";
import NavItem from "@/components/sidebar/nav-item";

import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "ui";
import { usePathname } from "next/navigation";
import { LayoutGroup } from "framer-motion";
import {
  FolderKanban,
  CalendarDays,
  ListTodo,
  Home,
  Inbox,
} from "lucide-react";

const navItems = {
  "/dashboard": { name: "dashboard", icon: Home, label: "home" },
  "/projects": { name: "projects", icon: FolderKanban, label: "projects" },
  "/tasks": { name: "tasks", icon: ListTodo, label: "tasks" },
  "/calendar": { name: "calendar", icon: CalendarDays, label: "Calendar" },
  "/inbox": { name: "inbox", icon: Inbox, label: "Inbox" },
};

export default function Sidebar(): JSX.Element {
  let pathname = usePathname() || "/";

  return (
    <aside className="w-12 flex flex-col justify-between items-center py-2">
      <TooltipProvider delayDuration={800} skipDelayDuration={500}>
        <LayoutGroup>
          <nav className="flex flex-col gap-y-3 items-center">
            {Object.entries(navItems).map(([path, { name, icon, label }]) => {
              const props = { name, icon, label, path };
              return (
                <Tooltip key={path}>
                  <TooltipTrigger>
                    <NavItem isActive={path === pathname} {...props} />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="capitalize rounded bg-secondary text-primary-background"
                  >
                    {label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </LayoutGroup>
        <nav className="py-2">
          <UserProfile />
        </nav>
      </TooltipProvider>
    </aside>
  );
}
