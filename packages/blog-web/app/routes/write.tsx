import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = ({ request }) => {
  const cookie = request.headers.get("cookie");

  const isLogin = cookie ? true : false;

  console.log("12312312312", isLogin);

  if (!isLogin) {
    return redirect("/");
  }

  return null;
};

export default function Write() {
  return <Outlet />;
}
