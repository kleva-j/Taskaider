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

const hub = z.object({
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
});

export const emailSchema = z.object({
  id: z.string().uuid({ message: "Id should be of UUID format" }),
  subject: z.string(),
  body: z.array(z.string()).min(1),
  folder: z.set(z.string()).nonempty({ message: "Ensure folder is set" }),
  opened: z.boolean(),
  date_sent: z.date(),
  recipient: hub,
  sender: hub,
});

export const emailListSchema = z.array(emailSchema);

export type paramsType = z.infer<typeof updateBatchParams>;

export const inboxFormSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Subject is not long enough!" })
    .max(100, { message: "Subject is a bit too long" }),
  body: z.string(),
  to: z.string(),
});

export type inboxFormSchemaType = z.infer<typeof inboxFormSchema>;
