import { availableStatus, priorities, defaultLabels } from "@taskaider/neon";
import { z } from "zod";

export const StatusEnum = z.enum(availableStatus);
export const PriorityEnum = z.enum(priorities);
export const labelEnum = z.enum(defaultLabels);

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

export const updateBatchParams = z
  .array(
    z.object({
      label: z.string().optional(),
      status: StatusEnum.optional(),
      priority: PriorityEnum.optional(),
    }),
  )
  .min(1);

export const getBatchFilterQuery = z.object({
  limit: z.number(),
  offset: z.number().optional(),
});

export type paramsType = z.infer<typeof updateBatchParams>;
