import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import { EF } from "~/components/expenses/Types";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";

export default function AddExpense() {
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  const validatedExpenseData = EF.parse(expenseData);
  await addExpense(validatedExpenseData);
  return redirect("/expenses");
}
