import { type fakeUserType } from "@/lib/helper";

import { UseInboxContext } from "@/inbox/components/InboxContext";
import {
  AvatarFallback,
  DialogContent,
  CommandEmpty,
  CommandGroup,
  DialogHeader,
  CommandInput,
  AvatarImage,
  DialogTitle,
  CommandItem,
  CommandList,
  Command,
  Dialog,
  Avatar,
} from "ui";

type Props = {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  setContact: (contact: fakeUserType | null) => void;
};

export const SelectContact = ({ isOpen, setOpen, setContact }: Props) => {
  const contacts = UseInboxContext()?.contacts;

  const handleSelect = (value: string) => {
    setContact(
      contacts!.find(({ fullName }) => fullName.toLowerCase() === value) ||
        null,
    );
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <DialogContent className="max-w-[320px]">
        <DialogHeader>
          <DialogTitle>Select Recipient</DialogTitle>
        </DialogHeader>
        <Command className="rounded-none">
          <CommandInput placeholder="Search contact..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {contacts!.map(({ email, avatar, fullName }) => (
                <CommandItem
                  key={fullName}
                  value={fullName}
                  onSelect={handleSelect}
                  className="flex items-center space-x-4 my-0.5"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={avatar} alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {fullName}
                    </p>
                    <p className="text-[12px] text-muted-foreground">{email}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
