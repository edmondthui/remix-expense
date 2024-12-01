// import { LoaderFunctionArgs } from "@remix-run/node";
import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
import { z } from "zod";
// import { z } from "zod";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import { EF } from "~/components/expenses/Types";
import Modal from "~/components/util/Modal";
import { updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
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

export async function action({ params, request }: ActionFunctionArgs) {
  const expenseId = params.id;
  const validatedExpenseId = z.string().parse(expenseId);
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  const validatedFormData = EF.parse(expenseData);
  try {
    validateExpenseInput(validatedFormData);
  } catch (error) {
    console.log(error);
  }
  await updateExpense(validatedExpenseId, validatedFormData);
  return redirect("/expenses");
}
