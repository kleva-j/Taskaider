import { type PropsWithChildren } from "react";

import { Tablist } from "@/calendar/components/Tablist";

export default function CalendarPage({ children }: PropsWithChildren) {
  return (
    <article className="p-4 flex-1 h-full overflow-y-auto space-y-4">
      <Tablist />
      {children}
    </article>
  );
}
