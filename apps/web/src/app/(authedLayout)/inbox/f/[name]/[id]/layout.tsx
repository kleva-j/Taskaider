import { ChevronLeft } from "lucide-react";
import { PropsWithChildren } from "react";
import { Button } from "ui";

import Link from "next/link";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-2 p-4">
      <div className="flex gap-x-2">
        <Button
          variant="outline"
          className="text-muted-foreground p-0 w-7 h-7"
          title="Go back"
          asChild
        >
          <Link href="/inbox/f/inbox/">
            <ChevronLeft size="18" />
          </Link>
        </Button>
      </div>
      {children}
    </div>
  );
}
