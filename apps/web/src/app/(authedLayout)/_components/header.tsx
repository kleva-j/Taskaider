"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";

export function Header() {
  return (
    <header className="flex justify-between mx-auto w-full px-4 h-12 items-center">
      <span className="text-sm">LOGO</span>
      <nav className="flex gap-x-4 items-center">
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
