"use client";

import { ThemeProvider } from "@/context/theme-provider";
import { Provider } from "@/app/_trpc/Provider";
import { PropsWithChildren } from "react";
import { Toaster } from "ui";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
};
