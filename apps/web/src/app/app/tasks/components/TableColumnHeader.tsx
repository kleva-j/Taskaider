import { Column } from "@tanstack/react-table";
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  Button,
  cn,
} from "ui";
import {
  ArrowDownIcon,
  CaretSortIcon,
  ArrowUpIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("ui-flex ui-items-center ui-space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="ui--ml-3 ui-h-8 ui-data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ui-ml-2 ui-h-4 ui-w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ui-ml-2 ui-h-4 ui-w-4" />
            ) : (
              <CaretSortIcon className="ui-ml-2 ui-h-4 ui-w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="ui-mr-2 ui-h-3.5 ui-w-3.5 ui-text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="ui-mr-2 ui-h-3.5 ui-w-3.5 ui-text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="ui-mr-2 ui-h-3.5 ui-w-3.5 ui-text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
