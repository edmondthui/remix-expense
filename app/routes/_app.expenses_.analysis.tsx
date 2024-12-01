import { LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import ErrorComponent from "~/components/util/ErrorComponent";
import { requireUserSession } from "~/data/auth.server";
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

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw Response.json(
      { message: "Could not find any expenses." },
      { status: 404, statusText: "No expenses found" }
    );
  }
  return expenses;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <ErrorComponent title={error.statusText}>
          <p>
            {error.data?.message ||
              "Something went wrong. Please try again later."}
          </p>
        </ErrorComponent>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main>
        <ErrorComponent title={"An error occurred"}>
          <p>
            {error.message || "Something went wrong. Please try again later."}
          </p>
        </ErrorComponent>
      </main>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
