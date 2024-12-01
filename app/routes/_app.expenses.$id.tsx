// import { LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
// import { z } from "zod";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
// import { getExpense } from "~/data/expenses.server";

export default function UpdateExpense() {
  const navigate = useNavigate();
  const closeHandler = () => {
    navigate("..");
  };
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export async function loader({ params }: LoaderFunctionArgs) {
//   const expenseId = params.id;
//   const validatedExpenseId = z.string().parse(expenseId);
//   const expense = await getExpense(validatedExpenseId);
//   return expense;
// }
