"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Tiptap } from "@/inbox/components/Tiptap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import {
  PopoverContent,
  PopoverTrigger,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
  Command,
  Popover,
  Button,
  Input,
  Form,
} from "ui";

const contacts = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const formSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Subject is not long enough!" })
    .max(100, { message: "Subject is a bit too long" }),
  body: z.string(),
  to: z.string(),
});

type formSchemaType = z.infer<typeof formSchema>;
type Contact = {
  value: string;
  label: string;
};

export function CreateNewInbox() {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const form = useForm<formSchemaType>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: { subject: "", body: "" },
  });

  return (
    <main className="px-3">
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="flex space-x-4 items-center">
                <FormLabel className="text-sm text-muted-foreground mt-2">
                  Subject:
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoCorrect="off"
                    autoComplete="email"
                    autoCapitalize="none"
                    className="invalid:border-red-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">Send to: </p>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[150px] justify-start text-muted-foreground"
                >
                  {selectedContact ? (
                    <>{selectedContact.label}</>
                  ) : (
                    <>+ Select Contact</>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="right" align="start">
                <Command>
                  <CommandInput placeholder="Change status..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {contacts.map((status) => (
                        <CommandItem
                          key={status.value}
                          value={status.value}
                          onSelect={(value) => {
                            setSelectedContact(
                              contacts.find(
                                (priority) => priority.value === value,
                              ) || null,
                            );
                            setOpen(false);
                          }}
                        >
                          {status.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Body</FormLabel>
                <FormControl>
                  <Tiptap content={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </main>
  );
}
