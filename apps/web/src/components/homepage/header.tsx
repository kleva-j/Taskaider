"use client";

import Link from "next/link";

import { buttonVariants, cn, Header } from "ui";

export const PageHeader = () => {
  return (
    <Header>
      <>
        <span>LOGO</span>
        <nav>
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "px-4",
            )}
          >
            Login
          </Link>
        </nav>
      </>
    </Header>
  );
};
