"use client";

import { type PropsWithChildren } from "react";

import { navigationHandle } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { buttonVariants, cn } from "ui";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";

export function AuthPageWrapper({ children }: PropsWithChildren) {
  let path = navigationHandle[usePathname().split("/")[1]];

  return (
    <div className="w-1/2 flex">
      <Link
        href={path.to}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-10 top-10 md:right-8 md:top-8",
        )}
      >
        {path.label}
      </Link>
      <div className="absolute bottom-10 right-10 md:right-8 md:bottom-8">
        <ThemeSwitcher />
      </div>

      <div className="grid gap-y-6 w-full max-w-xs mx-auto">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {path.heading}
          </h1>
          <p className="text-sm text-muted-foreground">{path.paragraph}</p>
        </div>
        {children}
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
