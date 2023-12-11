import { MailPlus } from "lucide-react";
import { Button } from "ui";

import Link from "next/link";

export const FloatingBtn = () => (
  <Button
    title="Create New"
    className="fixed z-90 bottom-10 right-8 w-10 h-10 px-0 py-0 rounded-full drop-shadow-lg flex justify-center items-center text-white hover:drop-shadow-xl animate-bounce duration-700"
    asChild
  >
    <Link href="/inbox/f/inbox/new">
      <MailPlus className="text-white" size={20} />
    </Link>
  </Button>
);
