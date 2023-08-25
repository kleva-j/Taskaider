import "../styles/index.css";
import "ui/styles.css";

import type { Metadata } from "next";

import { type PropsWithChildren } from "react";

import { ThemeProvider } from "@/context/theme-provider";
import { fontSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Taskaider",
  description: "My beautiful task management app.",
};

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ui-font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
