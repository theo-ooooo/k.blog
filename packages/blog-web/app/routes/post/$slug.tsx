import { json, type LoaderFunction } from "@remix-run/node";
import BasicLayout from "~/components/layouts/BasicLayout";
import Content from "~/components/post/Content";
import Head from "~/components/post/Head";
import { getPost } from "~/lib/api/post";
import type { Post } from "~/lib/api/post";
import { useLoaderData } from "@remix-run/react";
import { useUser } from "~/states/user";

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

export default PostDetail;
