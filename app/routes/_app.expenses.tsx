import { Outlet } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Test Expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
];

export default function ExpensesLayout() {
  return (
    <>
      <Outlet />
      <main>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
