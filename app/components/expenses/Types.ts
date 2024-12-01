import { z } from "zod";

export const Expense = z.object({
  date: z.string(),
  amount: z.number(),
  id: z.string(),
  title: z.string(),
});

export type Expense = z.infer<typeof Expense>;

export const EF = z.object({
  date: z.string(),
  amount: z.string(),
  title: z.string(),
});

export type EF = z.infer<typeof EF>;

export type ExpenseError = {
  title?: string;
  amount?: string;
  date?: string;
};
