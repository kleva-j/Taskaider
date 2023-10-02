"use client";

import { ToolbarSelectedAction } from "@/tasks/components/ToolbarSelectedAction";
import { DataTableFacetedFilter } from "@/tasks/components/TableFacetedFilter";
import { DataTableViewOptions } from "@/tasks/components/TableViewOptions";
import { priorities, statuses } from "@/tasks/_data";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useCallback } from "react";
import { Button, Input } from "ui";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isSomeSelected = table.getIsSomeRowsSelected();

  const toggleSelected = useCallback(
    () => table.toggleAllPageRowsSelected(false),
    [],
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 max-w-[250px]"
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
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-x-2 flex-row-reverse h-7 items-center">
        {isSomeSelected && (
          <ToolbarSelectedAction
            rows={table.getSelectedRowModel().rows}
            toggleSelected={toggleSelected}
          />
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
