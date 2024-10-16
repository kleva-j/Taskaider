import Link from "next/link";

import { LucideIcon } from "lucide-react";
import {
  TooltipContent,
  TooltipTrigger,
  buttonVariants,
  Tooltip,
  cn,
} from "ui";

type NavItemProps = {
  title: string;
  path?: string;
  label?: string;
  isActive?: boolean;
  icon: LucideIcon;
  variant: "default" | "ghost";
};

export const CollapsedNavItem = (props: NavItemProps) => {
  const { variant, title, label, icon: Icon, path } = props;
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={`${path || "#"}`}
          className={cn(
            buttonVariants({ variant, size: "icon" }),
            "h-9 w-9",
            variant === "default" &&
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {title}
      </TooltipContent>
    </Tooltip>
  );
};

export const NavItem = (props: NavItemProps) => {
  const { variant, title, label, icon: Icon, path } = props;
  return (
    <Link
      href={`${path || "#"}`}
      className={cn(
        buttonVariants({ variant: variant, size: "sm" }),
        variant === "default" &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start",
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      {title}
    </Link>
  );
};
