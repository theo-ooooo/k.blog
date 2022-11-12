import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { SangteProvider } from "sangte";
import { getMe } from "./lib/api/user";
import { User } from "./lib/api/types";
import { userState } from "./states/user";

import styles from "./styles/app.css";

interface LoaderResult {
  user: User | null;
  env: {
    API_BASE_URL: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get("Cookie");

  const env = {
    API_BASE_URL: process.env.API_BASE_URL,
  };
  if (!cookie) return json({ user: null, env });
  try {
    const { user } = await getMe(cookie);
    return json({ user, env });
  } catch (e) {
    // console.log("e1", e);
    return json({ user: null, env });
  }
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const { user } = useLoaderData<LoaderResult>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100">
        <SangteProvider
          initialize={({ set }) => {
            set(userState, user);
          }}
        >
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </SangteProvider>
      </body>
    </html>
  );
}
