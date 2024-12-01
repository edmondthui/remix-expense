import { LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";

export default function Auth() {
  return <AuthForm />;
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: authStyles }];
};
