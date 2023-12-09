import { Avatar, AvatarFallback, AvatarImage, cn } from "ui";
import { getInitials, EmailListType } from "@/lib/helper";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";

export const EmailListView = ({ emails }: { emails: EmailListType }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-800 overflow-y-auto no-scrollbar border-y border-border">
      {emails.map(({ id, subject, opened, date_sent, body, recipient }) => {
        return (
          <li
            key={id}
            className="p-4 hover:bg-accent cursor-pointer flex overflow-hidden items-start gap-x-3"
            onClick={() =>
              router.push(`/dashboard/inbox/f/${params.name}/${id}`)
            }
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={recipient.avatar} alt="Avatar" />
              <AvatarFallback>{getInitials(recipient.fullName)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-1 gap-y-2">
              <div className="flex items-center">
                <p className="text-xs leading-none capitalize text-muted-foreground">
                  {recipient.fullName}
                </p>
                <time className="ml-auto text-xs text-gray-500 dark:text-gray-400 self-center flex justify-end">
                  {format(date_sent, "LLL d")}, {format(date_sent, "ha")}
                </time>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center">
                  <p className="text-sm truncate capitalize overflow-ellipsis font-medium">
                    {subject}
                  </p>
                  <span className="relative flex h-[7px] w-[7px] ml-1.5">
                    <span
                      className={cn(
                        "bg-transparent",
                        !opened &&
                          "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/90 opacity-75",
                      )}
                    ></span>
                    <span
                      className={cn(
                        "relative inline-flex rounded-full h-[7px] w-[7px]",
                        !opened && "bg-primary",
                      )}
                    ></span>
                  </span>
                </div>

                <p className="w-full text-[13px] line-clamp-2 text-muted-foreground">
                  {body[0].slice(0, 100)}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
