import {
  QuestionMarkCircledIcon,
  CrossCircledIcon,
  CheckCircledIcon,
  ArrowRightIcon,
  StopwatchIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CircleIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
    color: "text-cyan-300",
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
    color: "text-amber-500",
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
    color: "text-red-500",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
    color: "text-muted-foreground",
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
    color: "text-purple-400",
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
    color: "text-orange-300",
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
    color: "text-teal-500",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: CrossCircledIcon,
    color: "text-red-400",
  },
];
