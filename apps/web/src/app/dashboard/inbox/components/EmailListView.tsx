import { EmailListType } from "@/inbox/f/[name]/layout";
import { cn } from "ui";

type Props = {
  emails: EmailListType;
};

export const EmailListView = ({ emails }: Props) => {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
      {emails.map((email) => (
        <li
          key={email.id}
          className="px-4 py-3 hover:bg-accent cursor-pointer flex justify-between items-start"
        >
          <div className="w-full truncate">
            <h2 className={cn("text-sm", !email.isRead && "font-bold")}>
              {email.address}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {email.subject}
            </p>
            <p className="text-sm truncate overflow-ellipsis">{email.body}</p>
          </div>
          <time className="text-xs text-gray-500 dark:text-gray-400 self-center flex justify-end">
            {new Date(email.sent_date).toLocaleDateString()}
          </time>
        </li>
      ))}
    </ul>
  );
};
