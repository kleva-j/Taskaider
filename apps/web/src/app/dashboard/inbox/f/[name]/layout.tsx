"use client";

import { EmailListColumn } from "@/inbox/components/EmailListColumn";
import { FolderColumn } from "@/inbox/components/FolderColumn";
import { Mosaic } from "react-mosaic-component";
import { generateEmails } from "@/lib/helper";
import { PropsWithChildren } from "react";

import "react-mosaic-component/react-mosaic-component.css";
import "./styles.css";

type PageProps = {
  params: { name: string; id: string };
  searchParams: { q?: string; id?: string };
};

const emails = generateEmails(8);

export type EmailListType = typeof emails;

const folderMap = {
  inbox: { name: "Inbox", email_count: 0 },
  important: { name: "Important", email_count: 0 },
  sent: { name: "Sent", email_count: 0 },
};

emails.forEach((email) => {
  const entry = folderMap[email.folder];
  folderMap[email.folder] = { ...entry, email_count: entry.email_count + 1 };
});

export default function Layout(props: PageProps & PropsWithChildren) {
  const { params, children } = props;

  const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
    a: <EmailListColumn emails={emails} folderName={params.name} />,
    b: <div>{children}</div>,
  };

  return (
    <article className="flex-1 h-full overflow-y-auto">
      <div className="flex h-full">
        <FolderColumn
          activeFolder={params.name}
          folderList={Object.values(folderMap)}
        />

        <Mosaic<string>
          renderTile={(id) => ELEMENT_MAP[id]}
          initialValue={{
            direction: "row",
            first: "a",
            second: "b",
            splitPercentage: 22,
          }}
        />
      </div>
    </article>
  );
}
