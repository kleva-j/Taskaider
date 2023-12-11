import type { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
  return <section>{children}</section>;
}
