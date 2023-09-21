import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker.",
};

export default async function ({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">{children}</div>
  );
}
