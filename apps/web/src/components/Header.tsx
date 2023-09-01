"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Header() {
  return (
    <header className="ui-flex ui-justify-between mx-auto w-full ui-px-4 ui-h-12 ui-items-center">
      <span className="text-sm">LOGO</span>
      <nav className="ui-flex ui-gap-x-4 ui-items-center">
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
