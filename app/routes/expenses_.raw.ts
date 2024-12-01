import { getExpenses } from "~/data/expenses.server";

export function loader() {
  return Response.json(getExpenses());
}
