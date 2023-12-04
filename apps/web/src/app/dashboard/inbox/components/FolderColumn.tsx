import { UseInboxContext } from "@/inbox/components/InboxContext";
import { InboxIcon, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "ui";

type Props = { activeFolder: string };

export const FolderColumn = ({ activeFolder }: Props) => {
  const router = useRouter();
  const context = UseInboxContext();
  const folderList = Object.values(context!.folderMap);

  return (
    <div className="w-[280px] border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-2 space-y-2">
      <ul className="space-y-1">
        {folderList.map((folder) => {
          const path = encodeURIComponent(folder.name.toLowerCase());
          const folderName = folder.name.toLowerCase();
          const isActive = activeFolder.toLowerCase() === folderName;
          return (
            <li
              key={folderName}
              className={cn(
                "px-3 py-2 hover:bg-accent cursor-pointer flex items-center justify-between rounded-md",
                isActive && "bg-accent",
              )}
              onClick={() => router.push(`/dashboard/inbox/f/${path}`)}
            >
              <div className="flex items-center space-x-3">
                {folderName === "inbox" && (
                  <InboxIcon className={cn("text-primary")} size={17} />
                )}
                {folderName === "sent" && (
                  <Send className="text-primary" size={17} />
                )}
                <span className="text-sm">{folder.name}</span>
              </div>
              <span
                className={cn(
                  "bg-accent rounded-full px-2 py-1 text-xs w-6 flex justify-center text-foreground",
                  folder.count && "bg-primary text-background",
                )}
              >
                {folder.total}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
