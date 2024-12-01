import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";

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
  // validate user input
  if (authMode === "login") {
    // login
  } else {
    // signup
  }
}
