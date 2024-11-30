import { LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css";

export default function Auth() {
  return <h1>Auth</h1>;
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: authStyles }];
};
