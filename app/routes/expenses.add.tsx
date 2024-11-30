import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

export default function AddExpense() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  );
}
