import { fetchClient } from "../client";
interface ThumbnailResult {
  result: boolean;
  data: {
    imageId: string;
    path: string;
    thumbnailId: number;
  };
}

interface TagListResult {
  result: boolean;
  data: {
    tags: {
      id: number;
      name: string;
    }[];
  };
}

interface CreatePostParams {
  title: string;
  content: string;
  tags: string[];
  thumbnailId: number | null;
  display: number;
}

interface PostsResult {
  result: boolean;
  data: { posts: Post[]; hasMorePost: boolean };
}

interface PostResult {
  result: boolean;
  data: Post;
}

interface Pagination<T> {
  posts: T[];
  hasMorePost: boolean;
}

export type GetItemsResult = Pagination<Post>;

export interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  user: {
    id: number;
    nickname: string;
  };
  postThumbnailImage: {
    webp: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export async function thumbnailUpload(data: File) {
  let formData = new FormData();
  formData.append("file", data);

  return await fetchClient.request<ThumbnailResult>({
    url: "api/v1/image/thumbnailUpload",
    method: "POST",
    body: formData,
  });
}

export async function createPost(params: CreatePostParams) {
  return await fetchClient.request({
    url: "api/v1/posts/create",
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getTagList() {
  return await fetchClient.request<TagListResult>({
    url: "api/v1/tags/list",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getPostList(lastId?: number | null) {
  const { data } = await fetchClient.request<PostsResult>({
    url: "api/v1/posts/list",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      lastId,
    },
  });
  return data.data;
}

export async function getPost(slug: string) {
  const { data } = await fetchClient.request<PostResult>({
    url: `api/v1/posts/${slug}`,
    method: "GET",
  });

  return data.data;
}
