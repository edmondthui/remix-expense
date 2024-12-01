import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import sharedStyles from "~/styles/shared.css?url";
import ErrorComponent from "./components/util/ErrorComponent";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap",
  },
  { rel: "stylesheet", href: sharedStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <ErrorComponent title={error.statusText}>
          <>
            <p>
              {error.data?.message ||
                "Something went wrong. Please try again later."}
            </p>
            <p>
              Back to <Link to="/">safety</Link>.
            </p>
          </>
        </ErrorComponent>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main>
        <ErrorComponent title={"An error occurred"}>
          <>
            <p>
              {error.message || "Something went wrong. Please try again later."}
            </p>
            <p>
              Back to <Link to="/">safety</Link>.
            </p>
          </>
        </ErrorComponent>
      </main>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function App() {
  return <Outlet />;
}
