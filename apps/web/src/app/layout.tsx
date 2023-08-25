import "../styles/index.css";
import "ui/styles.css";

import type { Metadata } from "next";

import { type PropsWithChildren } from "react";
import { fontSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Taskaider",
  description: "My beautiful task management app.",
};

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ui-font-sans`}>{children}</body>
    </html>
  );
}
