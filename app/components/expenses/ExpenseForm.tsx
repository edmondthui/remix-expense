import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { ExpenseError, Expenses } from "./Types";
// import { loader } from "~/routes/_app.expenses.$id";
// import { z } from "zod";
// import { FormEvent } from "react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData<ExpenseError>();
  const navigation = useNavigation();
  const matches = useMatches();
  const params = useParams();
  const expenseData = matches.find(
    (match) => match.id === "routes/_app.expenses"
  )?.data;
  const validatedExpenseData = Expenses.parse(expenseData);
  const expense = validatedExpenseData.find((data) => data.id === params.id);
  // const expenseData = useLoaderData<typeof loader>();
  const defaultValues = expense
    ? {
        title: expense.title,
        amount: expense.amount,
        date: expense.date.toLocaleDateString("en-CA"),
      }
    : {
        title: "",
        amount: 0,
        date: "",
      };

  const isSubmitting = navigation.state !== "idle";

  // const submit = useSubmit();
  // const formSchema = z.instanceof(HTMLFormElement);

  // function submitHandler(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   // perform your own validations
  //   // usually you don't do this and just use html form validations
  //   submit(formSchema.parse(e.target), {
  //     //action: '/expenses/add'
  //     method: "post",
  //   });
  // }

  return (
    <Form
      method="post"
      className="form"
      id="expense-form"
      // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValues.date}
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
