"use client";

import { Tabs, TabsList, TabsTrigger } from "ui";
import { usePathname } from "next/navigation";

import Link from "next/link";

export const Tablist = () => {
  const pathname = usePathname();
  const defaultView = pathname.split("/calendar/")[1];

  return (
    <Tabs defaultValue={defaultView} className="w-[160px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="week" asChild>
          <Link href="/calendar/week">Week</Link>
        </TabsTrigger>
        <TabsTrigger value="month" asChild>
          <Link href="/calendar/month">Month</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
