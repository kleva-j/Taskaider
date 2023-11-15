import { EmailEmptyView } from "@/inbox/components/EmailEmptyView";

type Props = {
  folderName: string;
  searchParams: { q?: string; id?: string };
};

export const SelectedEmailColumn = (props: Props) => {
  const { folderName, searchParams } = props;

  if (!searchParams.id) return <EmailEmptyView />;

  const email = { subject: "", sent_date: new Date(), body: "" };

  return (
    <div className="col-span-3 flex flex-col w-12/20">
      <div className="p-4 space-y-4 flex-grow overflow-y-auto">
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="text-xl font-bold">{email.subject}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {`From: ${folderName === "sent" ? "Me" : email}`}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {`To: ${folderName === "sent" ? email : "Me"}`}
          </p>
          <time className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(email.sent_date).toLocaleString()}
          </time>
        </div>
        <div>
          <p>{email.body}</p>
        </div>
      </div>
    </div>
  );
};
