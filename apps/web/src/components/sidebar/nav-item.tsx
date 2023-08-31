import Link from "next/link";

import { LucideIcon } from "lucide-react";
import { Button, cn } from "ui";

type NavItemProps = {
  name: string;
  path: string;
  label: string;
  isActive: boolean;
  icon: LucideIcon;
};

export default function NavItem(props: NavItemProps) {
  const { icon: Icon, path, isActive, ...rest } = props;
  return (
    <Button
      asChild
      variant="ghost"
      className={cn("px-2 rounded-sm", {
        "hover:bg-accent hover:text-accent-foreground": isActive,
      })}
      {...rest}
    >
      <Link href={path}>
        <Icon className="ui-text-foreground" size={20} />
      </Link>
    </Button>
  );
}
