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
