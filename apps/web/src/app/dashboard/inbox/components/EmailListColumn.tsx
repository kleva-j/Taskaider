import { Tabs, TabsList, TabsTrigger, Input, TabsContent } from "ui";
import { EmailListView } from "@/inbox/components/EmailListView";
import { EmailListType } from "@/inbox/f/[name]/layout";

type Props = {
  folderName: string;
  emails: EmailListType;
};

export const EmailListColumn = (props: Props) => {
  const { folderName } = props;

  const emails = props.emails.filter(({ folder }) => folder === folderName);

  const readEmails = emails.filter(({ isRead }) => isRead);

  const unreadEmails = emails.filter(({ isRead }) => !isRead);

  return (
    <aside className="flex flex-col gap-y-4 px-2 py-1">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full flex">
          <TabsTrigger value="all" className="flex-1">
            All
          </TabsTrigger>
          <TabsTrigger value="read" className="flex-1">
            Read
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex-1">
            Unread
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <EmailListView emails={emails} />
        </TabsContent>
        <TabsContent value="read">
          <EmailListView emails={readEmails} />
        </TabsContent>
        <TabsContent value="unread">
          <EmailListView emails={unreadEmails} />
        </TabsContent>
      </Tabs>
    </aside>
  );
};
