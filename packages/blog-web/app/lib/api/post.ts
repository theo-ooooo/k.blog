import { fetchClient } from "../client";
interface ThumbnailResult {
  result: boolean;
  data: {
    imageId: string;
    path: string;
    thumbnailId: number;
  };
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
