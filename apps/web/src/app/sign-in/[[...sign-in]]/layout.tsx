import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-1/2 h-full bg-primary"></div>
      {children}
    </main>
  );
}

export const metadata: Metadata = {
  title: "Log In / Sign Up - Taskaider",
  description: "Login / Signup page.",
};
