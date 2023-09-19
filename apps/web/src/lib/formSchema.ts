import {
  availableStatus,
  defaultLabels,
  priorities,
} from "@taskaider/db/src/schema";
import { z } from "zod";

export const addTaskFormSchema = z.object({
  title: z.string().min(1, "title is required"),
  priority: z.enum(priorities, {
    required_error: "You need to set a priority.",
  }),
  label: z.enum(defaultLabels, {
    required_error: "You need to select a label.",
  }),
  status: z.enum(availableStatus).default("backlog"),
});
