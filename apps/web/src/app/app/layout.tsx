import type { PropsWithChildren } from "react";

import Sidebar from "@/components/sidebar";
import Header from "@/components/Header";

type Props = PropsWithChildren;

export default function AuthedLayout(props: Props): JSX.Element {
  return (
    <section className="divide-y-[1px] flex flex-col h-screen divide-border">
      <Header />
      <section className="flex divide-x-[0.5px] flex-1 divide-border">
        <Sidebar />
        <article className="p-4 flex-1">{props.children}</article>
      </section>
    </section>
  );
}
