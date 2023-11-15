import { InboxIcon, FlagIcon, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "ui";

type Folder = { name: string; email_count: number };
type Props = { activeFolder: string; folderList: Folder[] };

export const FolderColumn = ({ activeFolder, folderList }: Props) => {
  const router = useRouter();
  return (
    <div className="w-[280px] border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-2 space-y-2">
      <ul className="space-y-1">
        {folderList.map((folder) => {
          const path = encodeURIComponent(folder.name.toLowerCase());
          const folderName = folder.name.toLowerCase();

          return (
            <li
              key={folderName}
              className={cn(
                "px-3 py-2 hover:bg-accent cursor-pointer flex items-center justify-between rounded-md",
                activeFolder.toLowerCase() === folderName && "bg-accent",
              )}
              onClick={() => router.push(`/dashboard/inbox/f/${path}`)}
            >
              <div className="flex items-center space-x-3">
                {folderName === "inbox" && <InboxIcon size={17} />}
                {folderName === "important" && <FlagIcon size={17} />}
                {folderName === "sent" && <Send size={17} />}
                <span className="text-sm">{folder.name}</span>
              </div>
              <span className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs w-6 flex justify-center">
                {folder.email_count}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
