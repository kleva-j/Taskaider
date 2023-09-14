"use client";

import Link from "next/link";

import { siteConfig } from "@/lib/siteconfig";
import { buttonVariants, Hero, cn } from "ui";

export const PageHero = () => {
  return (
    <Hero>
      <div className="space-x-4">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-foreground hover:bg-foreground/90",
          )}
        >
          Get Started
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          GitHub
        </Link>
      </div>
    </Hero>
  );
};
