"use client";

import { Avatar, AvatarFallback, AvatarImage } from "ui";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import TodoList from "@/components/TodoList";

export default function Page(): JSX.Element {
  return (
    <section className="ui-container ui-flex ui-flex-col ui-items-center ui-gap-x-5 ui-h-screen">
      <header className="ui-flex ui-justify-between mx-auto w-full ui-max-w-[900px] ui-p-4">
        <span>LOGO</span>
        <nav className="ui-flex ui-gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ThemeSwitcher />
        </nav>
      </header>

      <div className="ui-my-auto">
        <TodoList />
      </div>
    </section>
  );
}
