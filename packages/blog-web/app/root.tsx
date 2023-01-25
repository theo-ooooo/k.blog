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
import { type User } from "./lib/api/types";
import { userState } from "./states/user";

import styles from "./styles/app.css";
import reactMdeStyles from "react-mde/lib/styles/css/react-mde-all.css";

import { setClientCookie } from "./lib/client";
import { getMyUserInfo } from "./lib/protected";
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
    setClientCookie(cookie);
    const { user, headers } = await getMyUserInfo();

    return json({ user, env }, { headers });
  } catch (e) {
    // console.log("e1", e);
    return json({ user: null, env });
  }
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: reactMdeStyles },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.css",
    },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const { user, env } = useLoaderData<LoaderResult>();

  console.log(user);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100">
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.ENV = ${JSON.stringify(env)}
          `,
          }}
        />
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
