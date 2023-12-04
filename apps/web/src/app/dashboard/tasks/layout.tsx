import type { PropsWithChildren, ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker.",
};

interface LayoutProps extends PropsWithChildren {
  modal: ReactNode;
}

export default async function (props: LayoutProps) {
  return (
    <article className="flex-1 h-full overflow-y-auto">
      <div className="flex flex-1 flex-col space-y-8 p-8">
        {props.children}
        {props.modal}
      </div>
    </article>
  );
}
