import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import {
  CommandSeparator,
  PopoverTrigger,
  PopoverContent,
  CommandGroup,
  CommandInput,
  CommandEmpty,
  CommandItem,
  CommandList,
  Separator,
  Popover,
  Command,
  Button,
  Badge,
  cn,
} from "ui";

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilter<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="ui-h-8 ui-border-dashed">
          <PlusCircledIcon className="ui-mr-2 ui-h-4 ui-w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="ui-mx-2 ui-h-4" />
              <Badge
                variant="secondary"
                className="ui-rounded-sm ui-px-1 ui-font-normal ui-lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="ui-hidden ui-space-x-1 ui-lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="ui-rounded-sm ui-px-1 ui-font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="ui-rounded-sm ui-px-1 ui-font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ui-w-[200px] ui-p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "ui-mr-2 ui-flex ui-h-4 ui-w-4 ui-items-center ui-justify-center ui-rounded-sm ui-border ui-border-primary",
                        isSelected
                          ? "ui-bg-primary ui-text-primary-foreground"
                          : "ui-opacity-50 ui-[&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className="ui-h-4 ui-w-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="ui-mr-2 ui-h-4 ui-w-4 ui-text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ui-ml-auto ui-flex ui-h-4 ui-w-4 ui-items-center ui-justify-center ui-font-mono ui-text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="ui-justify-center ui-text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
