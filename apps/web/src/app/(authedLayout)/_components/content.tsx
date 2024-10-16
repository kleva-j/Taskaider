"use client";

import { type PropsWithChildren, useState } from "react";

import { NavLinks } from "@/lib/siteconfig";
import { Nav } from "@/authedLayout/nav";
import {
  ResizablePanelGroup,
  TooltipProvider,
  ResizableHandle,
  ResizablePanel,
  cn,
} from "ui";

type Props = PropsWithChildren & {
  defaultCollapsed: boolean;
  defaultLayout: number[];
  navCollapsedSize: number;
};

export const Content = ({
  defaultCollapsed = true,
  navCollapsedSize,
  children,
}: Props) => {
  const [isCollapsed, setCollapsed] = useState(defaultCollapsed);

  const handleCollapse = () => {
    const collapsed = !isCollapsed;
    setCollapsed(() => collapsed);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      collapsed,
    )}`;
  };

  const handleLayoutChange = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={handleLayoutChange}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={10}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={3}
          maxSize={10}
          onCollapse={handleCollapse}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <Nav links={NavLinks} isCollapsed={isCollapsed} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
