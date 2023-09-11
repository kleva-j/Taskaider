import "../styles/index.css";
import "ui/styles.css";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { Providers } from "@/components/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { fontSans } from "@/lib/fonts";
import { env } from "@/env";

export default function RootLayout(props: PropsWithChildren): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans bg-background`}>
        <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <Providers>{props.children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Taskaider",
  description: "My beautiful task management app.",
};
