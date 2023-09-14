"use client";

import { PropsWithChildren } from "react";

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="container z-40 bg-background">
      <div className="flex h-20 items-center justify-between py-6">
        {children}
      </div>
    </header>
  );
};
