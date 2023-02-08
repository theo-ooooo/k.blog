import type { MetaFunction } from "@remix-run/node";
import { json, type LoaderFunction } from "@remix-run/node";
import BasicLayout from "~/components/layouts/BasicLayout";
import Content from "~/components/post/Content";
import Head from "~/components/post/Head";
import { getPost } from "~/lib/api/post";
import type { Post } from "~/lib/api/post";
import { useCatch, useLoaderData, useNavigate } from "@remix-run/react";
import { useUser } from "~/states/user";
import removeMd from "remove-markdown";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const slug = params.slug;
    if (!slug) {
      throw json({ message: "notfound" }, { status: 404 });
    }
    const data = await getPost(slug);
    return json(data);
  } catch (e: any) {
    throw json(
      {
        message: e?.message,
      },
      { status: 500 }
    );
  }
};

export const meta: MetaFunction = ({ data }: { data: Post }) => {
  if (data) {
    const plainText = removeMd(data.content);

    const shortDescription = plainText
      .slice(0, 300)
      .concat(plainText.length > 300 ? "..." : "");

    const twitterCardInfo = {
      "twitter:card": data.postThumbnailImage.webp
        ? "summary_large_image"
        : "summary",
      "twitter:site": "<blog.kwkang.dev/>",
      "twitter:title": `${data.title} - kwkang`,
      "twitter:description": shortDescription,
      "twitter:image": data.postThumbnailImage.webp,
    };

    return {
      title: `${data.title} - kwkang`,
      description: shortDescription,
      "og:title": data.title,
      "og:description": shortDescription,
      "og:image": data.postThumbnailImage.webp ?? undefined,
      "article:author": data.user.nickname,
      ...twitterCardInfo,
    };
  }
  return {};
};

function PostDetail() {
  const data = useLoaderData<Post>();
  const user = useUser();

  return (
    <BasicLayout>
      <div className="bg-white">
        <Head
          post={data}
          title={data.title}
          createdAt={data.createdAt}
          user={user}
          publishName={data.user.nickname}
          publishId={data.user.id}
          thumbnail={data.postThumbnailImage.webp}
        />
        <Content content={data.content} />
      </div>
    </BasicLayout>
  );
}
export function CatchBoundary() {
  const caught = useCatch();

  const navigate = useNavigate();

  return (
    <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] translate-x-[-50%] translate-y-[-50%] flex justify-center flex-col items-center">
      <h1 className="text-xl font-semibold mb-5 -tracking-[1px] ">
        {caught.data.message === "post not found"
          ? "존재하지 게시글 입니다."
          : "에러가 발생하였습니다."}
      </h1>
      <button
        className="bg-blue-400 p-2 text-sm text-white rounded cursor-pointer"
        onClick={() => navigate("/")}
      >
        메인으로 이동하기
      </button>
    </div>
  );
}

export default PostDetail;
