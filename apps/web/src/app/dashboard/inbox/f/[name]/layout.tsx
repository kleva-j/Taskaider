"use client";

import { type PropsWithChildren } from "react";

import { EmailListColumn } from "@/inbox/components/EmailListColumn";
import { InboxProvider } from "@/inbox/components/InboxContext";
import { FolderColumn } from "@/inbox/components/FolderColumn";
import { Mosaic } from "react-mosaic-component";

import "react-mosaic-component/react-mosaic-component.css";
import "./styles.css";

type PageProps = PropsWithChildren & {
  params: { name: string; id: string };
  searchParams: { q?: string; id?: string };
};

export default function Layout(props: PageProps) {
  const { params, children } = props;

  const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
    a: <EmailListColumn params={params} />,
    b: <div>{children}</div>,
  };

  return (
    <InboxProvider>
      <article className="flex-1 h-full overflow-y-auto">
        <div className="flex h-full">
          <FolderColumn activeFolder={params.name} />

          <Mosaic<string>
            renderTile={(id) => ELEMENT_MAP[id]}
            initialValue={{
              direction: "row",
              first: "a",
              second: "b",
              splitPercentage: 27,
            }}
          />
        </div>
      </article>
    </InboxProvider>
  );
}
