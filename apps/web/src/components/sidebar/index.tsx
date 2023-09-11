"use client";

import UserProfile from "@/components/sidebar/user-profile";
import NavItem from "@/components/sidebar/nav-item";

import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "ui";
import { Home, ListTodo, FolderKanban } from "lucide-react";
import { usePathname } from "next/navigation";
import { LayoutGroup } from "framer-motion";

const navItems = {
  "/app": { name: "app", icon: Home, label: "home" },
  "/app/tasks": { name: "tasks", icon: ListTodo, label: "tasks" },
  "/app/projects": { name: "projects", icon: FolderKanban, label: "projects" },
};

export default function Sidebar(): JSX.Element {
  let pathname = usePathname() || "/";
  if (pathname.includes("/tasks/")) pathname = "/tasks";

  return (
    <aside className="w-12 flex flex-col justify-between items-center py-2">
      <TooltipProvider delayDuration={800} skipDelayDuration={500}>
        <LayoutGroup>
          <nav className="flex flex-col gap-y-2 items-center">
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
