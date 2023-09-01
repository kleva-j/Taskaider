import { Table } from "@tanstack/react-table";
import {
  DoubleArrowRightIcon,
  DoubleArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons";

import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
  Button,
} from "ui";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="ui-flex ui-items-center ui-justify-between ui-px-2">
      <div className="ui-flex-1 ui-text-sm ui-text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="ui-flex ui-items-center ui-space-x-6 ui-lg:space-x-8">
        <div className="ui-flex ui-items-center ui-space-x-2">
          <p className="ui-text-sm ui-font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="ui-h-8 ui-w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="ui-flex ui-w-[100px] ui-items-center ui-justify-center ui-text-sm ui-font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="ui-flex ui-items-center ui-space-x-2">
          <Button
            variant="outline"
            className="ui-hidden ui-h-8 ui-w-8 ui-p-0 ui-lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="ui-h-4 ui-w-4" />
          </Button>
          <Button
            variant="outline"
            className="ui-h-8 ui-w-8 ui-p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="ui-h-4 ui-w-4" />
          </Button>
          <Button
            variant="outline"
            className="ui-h-8 ui-w-8 ui-p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="ui-h-4 ui-w-4" />
          </Button>
          <Button
            variant="outline"
            className="ui-hidden ui-h-8 ui-w-8 ui-p-0 ui-lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="ui-h-4 ui-w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
