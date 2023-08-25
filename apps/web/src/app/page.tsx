"use client";

import { Button, Header, Avatar, AvatarFallback, AvatarImage } from "ui";

export default function Page(): JSX.Element {
  return (
    <section className="ui-container ui-flex ui-items-center ui-justify-center ui-gap-x-5 ui-h-screen">
      <span className="ui-font-sans">Web</span>
      <Button variant="destructive">Button</Button>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </section>
  );
}
