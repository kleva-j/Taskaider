import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { AuthPageWrapper } from "@/app/(auth)/_components";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import Image from "next/image";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { userId } = auth();

  if (userId) redirect("/app");

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="max-sm:hidden w-1/2 h-full bg-primary flex flex-col justify-between relative">
        <a
          href="https://storyset.com/technology"
          className="absolute top-10 left-5"
        >
          <Image
            src="/person.svg"
            alt="banner"
            width="250"
            height="250"
            priority
          />
        </a>
        <a
          href="https://storyset.com/technology"
          className="absolute bottom-20 right-10"
        >
          <Image
            src="/parcel.svg"
            alt="banner"
            width="300"
            height="300"
            priority
          />
        </a>
      </div>
      <AuthPageWrapper>{children}</AuthPageWrapper>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Log In / Sign Up - Taskaider",
  description: "Login / Signup page.",
};
