import {
  type EmailListType,
  type fakeUserType,
  fakeUserEmailRecords,
} from "@/lib/helper";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type FolderMapType = Record<"inbox" | "sent", Folder>;
type Folder = { name: string; count: number; total: number };
type InboxContextType = {
  emails: EmailListType;
  folderMap: FolderMapType;
  contacts: fakeUserType[];
};

const InboxContext = createContext<InboxContextType | null>(null);

export function UseInboxContext() {
  const context = useContext(InboxContext);
  if (context === undefined)
    throw new Error(`useInboxContext must be used within a Provider`);
  return context;
}

export const InboxProvider = ({ children }: PropsWithChildren) => {
  const { emails, contacts } = fakeUserEmailRecords();

  const folderMap: FolderMapType = emails.reduce(
    (acc, { opened, folder }) => {
      let { inbox, sent } = acc;
      if (folder.has("sent")) sent = { ...sent, total: sent.total + 1 };
      if (!opened) inbox = { ...inbox, count: inbox.count + 1 };
      return { inbox, sent };
    },
    {
      inbox: { name: "Inbox", count: 0, total: emails.length },
      sent: { name: "Sent", count: 0, total: 0 },
    },
  );

  const [state] = useState({ emails, folderMap, contacts });

  return (
    <InboxContext.Provider value={state}>{children}</InboxContext.Provider>
  );
};
