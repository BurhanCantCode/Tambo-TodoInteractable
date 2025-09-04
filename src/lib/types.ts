import { z } from "zod";

export const todoListSchema = z.object({
  title: z.string(),
  todos: z.array(z.object({
    id: z.string(),
    text: z.string(),
    completed: z.boolean(),
  })),
  theme: z.enum(["light", "dark", "blue"]).optional(),
});

export type TodoList = z.infer<typeof todoListSchema>;
