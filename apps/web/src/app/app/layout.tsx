import type { PropsWithChildren } from "react";

import Sidebar from "@/components/sidebar";
import Header from "@/components/Header";

type Props = PropsWithChildren;

export default function AuthedLayout(props: Props): JSX.Element {
  return (
    <section className="ui-divide-y-[1px] ui-flex ui-flex-col ui-h-screen ui-divide-border">
      <Header />
      <section className="ui-flex ui-divide-x-[0.5px] ui-flex-1 ui-divide-border">
        <Sidebar />
        <article className="ui-p-4 ui-flex-1">{props.children}</article>
      </section>
    </section>
  );
}
