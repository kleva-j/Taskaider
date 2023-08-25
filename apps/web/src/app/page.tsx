"use client";

import { Button, Header, Avatar, AvatarFallback, AvatarImage } from "ui";

export default function Page(): JSX.Element {
  return (
    <section className="ui-container ui-flex ui-items-center ui-justify-center ui-gap-x-5 ui-h-screen">
      <Header text="Web" />
      <Button variant="destructive">Button</Button>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </section>
  );
}
