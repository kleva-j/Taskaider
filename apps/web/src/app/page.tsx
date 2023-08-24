"use client";

import { Button, Header } from "ui";

export default function Page(): JSX.Element {
  return (
    <section className="container">
      <Header text="Web" />
      <Button variant="destructive">Button</Button>
    </section>
  );
}
