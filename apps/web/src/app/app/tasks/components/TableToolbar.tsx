"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button, Input } from "ui";

import { DataTableFacetedFilter } from "@/app/app/tasks/components/TableFacetedFilter";
import { DataTableViewOptions } from "@/app/app/tasks/components/TableViewOptions";
import { priorities, statuses } from "@/app/app/tasks/_data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="ui-flex ui-items-center ui-justify-between">
      <div className="ui-flex ui-flex-1 ui-items-center ui-space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="ui-h-8 ui-w-[150px] ui-lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="ui-h-8 ui-px-2 ui-lg:px-3"
          >
            Reset
            <Cross2Icon className="ui-ml-2 ui-h-4 ui-w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
