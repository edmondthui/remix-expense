import { useLoaderData } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesAnalysis() {
  const expenses = useLoaderData<typeof loader>();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export function loader() {
  return getExpenses();
}
