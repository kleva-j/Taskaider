"use client";

import { UseInboxContext } from "@/inbox/components/InboxContext";
import { EmailListView } from "@/inbox/components/EmailListView";
import { SelectFilter } from "@/inbox/components/SelectFilter";
import { EmailListType } from "@/lib/helper";
import { compareDesc } from "date-fns";
import { useState } from "react";
import { Input } from "ui";

export enum SelectOptions {
  all = "all",
  unread = "unread",
}

export const EmailListColumn = ({ params }: { params: { name: string } }) => {
  const context = UseInboxContext();

  const emails = context!.emails
    .filter((email) => email.folder.has(params.name))
    .sort((a, b) => compareDesc(a.date_sent, b.date_sent));

  const unreadEmails: EmailListType = emails.filter((email) => !email.opened);

  const filterGroups = {
    [SelectOptions.all]: emails,
    [SelectOptions.unread]: unreadEmails,
  };

  const [option, setOption] = useState<SelectOptions>(SelectOptions.all);

  return (
    <aside className="flex flex-col gap-y-3 py-1 h-full">
      <div className="px-2 space-y-3">
        <Input
          type="search"
          placeholder="Search..."
          className="md:w-[100px] lg:w-[300px]"
        />
        <SelectFilter option={option} setOption={setOption} />
      </div>
      <EmailListView emails={filterGroups[option]} />
    </aside>
  );
};
