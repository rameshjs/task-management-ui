import { z } from "zod/v4";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high"]),
});

export const editTaskSchema = createTaskSchema.extend({
  status: z.enum(["todo", "in-progress", "done"]),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
export type EditTaskFormValues = z.infer<typeof editTaskSchema>;
