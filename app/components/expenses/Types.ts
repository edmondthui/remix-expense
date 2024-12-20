import { z } from "zod";

export const Expense = z.object({
  date: z.date(),
  amount: z.number(),
  id: z.string(),
  title: z.string(),
});

export type Expense = z.infer<typeof Expense>;

export const Expenses = z.array(Expense);
export type Expenses = z.infer<typeof Expenses>;

export const EF = z.object({
  date: z.string(),
  amount: z.string(),
  title: z.string(),
});
export type EF = z.infer<typeof EF>;

export const ZAuth = z.object({
  email: z.string(),
  password: z.string(),
});
export type ZAuth = z.infer<typeof ZAuth>;
export type AuthError = {
  email?: string;
  password?: string;
};

export type ExpenseError = {
  title?: string;
  amount?: string;
  date?: string;
};
