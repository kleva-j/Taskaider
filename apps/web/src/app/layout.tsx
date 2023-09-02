import "../styles/index.css";
import "ui/styles.css";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ThemeProvider } from "@/context/theme-provider";
import { fontSans } from "@/lib/fonts";

import Provider from "@/app/_trpc/Provider";

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans bg-background`}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Taskaider",
  description: "My beautiful task management app.",
};
