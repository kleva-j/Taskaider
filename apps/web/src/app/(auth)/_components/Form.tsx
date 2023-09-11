"use client";

import { type PropsWithChildren } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  Button,
  Input,
  Form,
} from "ui";

export const formSchema = z.object({
  email: z.string().email("Invalid email").min(4, "Email is required"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

interface UserAuthFormProps extends PropsWithChildren {
  onSubmit: (arg: FormSchemaType) => void;
  isLoaded: boolean;
  isLoading: boolean;
}

export function UserAuthForm(props: UserAuthFormProps) {
  const { children, onSubmit, isLoading, isLoaded } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-y-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoCorrect="off"
                        autoComplete="email"
                        autoCapitalize="none"
                        placeholder="name@example.com"
                        className="invalid:border-red-500"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button variant="default" type="submit" disabled={isLoading}>
              {isLoading ||
                (!isLoaded && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ))}{" "}
              Continue with Email
            </Button>
          </div>
        </form>
      </Form>
      {children}
    </>
  );
}
