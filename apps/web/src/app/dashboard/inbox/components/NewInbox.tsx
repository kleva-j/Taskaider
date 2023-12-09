"use client";

import { inboxFormSchema, inboxFormSchemaType } from "@/lib/typeSchema";
import { SelectContact } from "@/inbox/components/SelectContact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tiptap } from "@/inbox/components/Tiptap";
import { fakeUserType } from "@/lib/helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  AvatarFallback,
  FormControl,
  AvatarImage,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
  Avatar,
  Button,
  Input,
  Form,
} from "ui";

export function CreateNewInbox() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<fakeUserType | null>(
    null,
  );

  const form = useForm<inboxFormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(inboxFormSchema),
    defaultValues: { subject: "", body: "" },
  });

  return (
    <main className="flex gap-x-3">
      <Form {...form}>
        <form className="space-y-3 flex-1">
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
                    type="text"
                    autoCorrect="off"
                    autoComplete="text"
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(!open)}
              className="justify-start text-muted-foreground"
            >
              {selectedContact ? (
                <>
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src={selectedContact!.avatar} alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  {selectedContact.fullName}
                </>
              ) : (
                <>+ Select Contact</>
              )}
            </Button>
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
      <SelectContact
        isOpen={open}
        setOpen={setOpen}
        setContact={setSelectedContact}
      />
    </main>
  );
}
