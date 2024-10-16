import {
  FolderKanban,
  CalendarDays,
  ListTodo,
  Inbox,
  Home,
} from "lucide-react";

export const siteConfig = {
  links: {
    github: "https://github.com/kleva-j/Taskaider",
  },
};

export const NavLinks = [
  {
    title: "dashboard",
    icon: Home,
    label: "home",
    variant: "default",
    path: "/dashboard",
  },
  {
    title: "projects",
    icon: FolderKanban,
    label: "projects",
    variant: "default",
    path: "/projects",
  },
  {
    title: "tasks",
    icon: ListTodo,
    label: "tasks",
    variant: "default",
    path: "/tasks",
  },
  {
    title: "calendar",
    icon: CalendarDays,
    label: "calendar",
    variant: "default",
    path: "/calendar",
  },
  {
    title: "inbox",
    icon: Inbox,
    label: "inbox",
    variant: "default",
    path: "/inbox",
  },
];
