import {
  ActionFunction,
  HeadersInit,
  json,
  MetaFunction,
} from "@remix-run/node";
import { type ThrownResponse, useActionData, useCatch } from "@remix-run/react";
import { useEffect } from "react";
import LoginForm from "~/components/login/LoginForm";
import { AuthResult, login } from "~/lib/api/auth";
import { AppError } from "~/lib/error";
import { useSetUser } from "~/states/user";

export const meta: MetaFunction = () => {
  return { title: "로그인", robots: "noindex" };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") return;

  try {
    const { result, headers }: { result: AuthResult; headers: any } =
      await login({
        email,
        password,
      });

    console.log(headers);

    return json(result, { headers });
  } catch (e: any) {
    throw json(e?.response?.data, { status: e?.response?.status });
  }
};

interface Props {
  error?: AppError;
}

export default function Login({ error }: Props) {
  const actionData = useActionData<AuthResult>();
  const setUser = useSetUser();

  useEffect(() => {
    if (!actionData) return;
    setUser(actionData.user);
  }, [actionData, setUser]);

  return <LoginForm error={error} />;
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, AppError>>();
  console.log(caught);

  return <Login error={caught.data} />;
}
