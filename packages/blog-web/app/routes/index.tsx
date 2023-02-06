import { json, type LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import PostCardList from "~/components/home/PostCardList";
import BasicLayout from "~/components/layouts/BasicLayout";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import type { GetItemsResult } from "~/lib/api/post";
import { getPostList } from "~/lib/api/post";

export const loader: LoaderFunction = async () => {
  try {
    const data = await getPostList();

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

export default function Index() {
  const initialData = useLoaderData<GetItemsResult>();
  const ref = useRef<HTMLDivElement>(null);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["posts"],
    ({ pageParam = null }) => getPostList(pageParam),
    {
      initialData: {
        pageParams: [undefined],
        pages: [initialData],
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasMorePost) return undefined;

        const cursor = lastPage.posts[lastPage.posts.length - 1].id;
        return cursor;
      },
    }
  );

  const fetchNext = useCallback(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  useInfiniteScroll(ref, fetchNext);

  const items = data?.pages.flatMap((page) => page.posts);
  return (
    <BasicLayout>
      <PostCardList posts={items || []} />
      <div ref={ref} />
    </BasicLayout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <p></p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
