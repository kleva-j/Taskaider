"use client";

import { SelectedEmailColumn } from "@/inbox/components/SelectedEmailColumn";
import { UseInboxContext } from "@/inbox/components/InboxContext";
import { emailSchema } from "@/lib/typeSchema";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().uuid({ message: "Email Id is invalid!" }),
  name: z.string().min(4),
});

type PageProps = {
  params: z.infer<typeof paramsSchema>;
  searchParams: { q?: string; id?: string };
};

export default function ({ params }: PageProps) {
  const { id, name: folderName } = paramsSchema.parse(params);

  const context = UseInboxContext();

  const email = emailSchema.parse(context!.emails.find((e) => e.id === id));

  return <SelectedEmailColumn email={email!} folderName={folderName} />;
}
