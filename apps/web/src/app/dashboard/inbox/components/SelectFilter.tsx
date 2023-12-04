import { SelectOptions } from "@/inbox/components/EmailListColumn";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "ui";

type Props = {
  option: SelectOptions;
  setOption: (options: SelectOptions) => void;
};

export const SelectFilter = ({ option, setOption }: Props) => {
  const all = SelectOptions.all;
  const unread = SelectOptions.unread;

  return (
    <Select onValueChange={setOption} defaultValue={option}>
      <SelectTrigger className="ml-auto w-[90px] shadow-none capitalize">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={all} className="capitalize">
          {all}
        </SelectItem>
        <SelectItem value={unread} className="capitalize">
          {unread}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
