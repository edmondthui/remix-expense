import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import expensesStyles from "~/styles/expenses.css?url";

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

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: expensesStyles }];
};
