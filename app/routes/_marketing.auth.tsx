import { ActionFunctionArgs, LinksFunction, redirect } from "@remix-run/node";
import authStyles from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation.server";
import { ZAuth } from "~/components/expenses/Types";
import { login, signup } from "~/data/auth.server";

export default function Auth() {
  return <AuthForm />;
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: authStyles }];
};

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const validatedCredientials = ZAuth.parse(credentials);

  try {
    validateCredentials(validatedCredientials);
  } catch (error) {
    console.log(error);
    return error;
  }
  try {
    if (authMode === "login") {
      return await login(validatedCredientials);
    } else {
      return await signup(validatedCredientials);
    }
  } catch (error) {
    if (error instanceof Error) return { credentials: error.message };
    return error;
  }

  // return Response.json("test");
}
