import { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import BasicLayout from "~/components/layouts/BasicLayout";
import QueryString, { stringify } from "qs";

export const meta: MetaFunction = ({ params, data, location }) => {
  //   console.log(location);

  const { title } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  if (!title) {
    return {
      title: "검색",
      robots: "noindex",
    };
  }

  return {
    title: `"${title}" 검색 결과 - kblog`,
    description: `"${title}" 검색 결과입니다.`,
  };
};

export default function Search() {
  const [searchParams] = useSearchParams();
  return (
    <BasicLayout>
      <div>{searchParams.get("title")}</div>
    </BasicLayout>
  );
}
