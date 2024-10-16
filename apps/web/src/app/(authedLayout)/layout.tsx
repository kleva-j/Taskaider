import type { PropsWithChildren } from "react";

import { Content } from "@/authedLayout/content";
import { Header } from "@/authedLayout/header";
import { cookies } from "next/headers";

type Props = PropsWithChildren;

export default function AuthedLayout(props: Props) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <section className="divide-y-[1px] flex flex-col h-screen divide-border">
      <Header />
      <Content
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={2}
        children={props.children}
      />
    </section>
  );
}
