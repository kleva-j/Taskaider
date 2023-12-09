import { EmailListType } from "@/lib/helper";

type Props = {
  folderName: string;
  email: EmailListType[0];
};

export const SelectedEmailColumn = ({ folderName, email }: Props) => {
  const { subject, date_sent, body, recipient, sender } = email;

  return (
    <div className="col-span-3 flex flex-col w-12/20">
      <div className="space-y-4 flex-grow overflow-y-auto">
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="text-xl font-bold capitalize">{subject}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {`From: ${folderName === "sent" ? "Me" : sender.email}`}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {`To: ${folderName === "sent" ? recipient.email : "Me"}`}
          </p>
          <time className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(date_sent).toLocaleString()}
          </time>
        </div>
        <div className="space-y-4">
          {body.map((p, i) => (
            <p key={i} className="text-sm">
              {p}
            </p>
          ))}
          <p></p>
        </div>
      </div>
    </div>
  );
};
