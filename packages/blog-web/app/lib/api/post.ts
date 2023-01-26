import { fetchClient } from "../client";

export async function thumbnailUpload(data: File) {
  const formData = new FormData();
  formData.append("file", data);
  return await fetchClient.request({
    url: "api/v1/image/thumbnailUpload",
    method: "POST",
    body: {
      formData,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
