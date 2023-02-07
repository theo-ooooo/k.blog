import Button from "~/components/system/Button";
import { MdImage } from "react-icons/md";
import useUpload from "~/hooks/useUpload";
import WriteForm from "~/components/write/WriteForm";
import { useCallback, useEffect } from "react";
import { thumbnailUpload, updatePost } from "~/lib/api/post";
import { useWriteActions, useWriteValue } from "~/states/write";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { applyAuth } from "~/lib/applyAuth";
import { useFetcher, useNavigate } from "react-router-dom";
import _ from "lodash";
import type { AppError } from "~/lib/error";
import type { ThrownResponse } from "@remix-run/react";
import { useCatch } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const applied = applyAuth(request);

  if (!applied) {
    throw new Error("not logged in");
  }

  const form = await request.formData();
  const postId = form.get("postId") as string;
  const title = form.get("title") as string;
  const content = form.get("content") as string;
  const tags = form.get("tags") as string;
  const display = form.get("display") as string;
  const thumbnailId = form.get("thumbnailId") as string;

  const tagArr = _.compact(_.split(tags, ","));

  try {
    await updatePost({
      postId: +postId,
      title,
      content,
      tags: tagArr,
      display: +display,
      thumbnailId: +thumbnailId,
    });

    return redirect("/");
  } catch (e) {
    console.log(e);

    throw json(e);
  }
};

export default function Thumbnail() {
  const [upload, file] = useUpload();
  const actions = useWriteActions();
  const fetcher = useFetcher();
  const { thumnailPath, form } = useWriteValue();

  const uploadFn = useCallback(async () => {
    if (!file) return;

    const {
      data: { result, data },
    } = await thumbnailUpload(file);
    if (!result) return;
    actions.change("thumbnailId", data.thumbnailId);
    actions.changeThumbnail(data.path);
  }, [file, actions]);

  const deleteImage = () => {
    actions.removeThumbnail();
  };

  useEffect(() => {
    if (!file) return;
    uploadFn();
  }, [file, uploadFn]);

  return (
    <WriteForm
      onSubmit={(e) => {
        e.preventDefault();
        fetcher.submit(form, { method: "post" });
      }}
      buttonText="저장"
    >
      <div className="flex flex-1 justify-center">
        <div className="flex justify-center w-[600px] flex-col">
          <h2 className="text-center text-2xl mb-5">썸네일 업로드</h2>
          <div className="bg-gray-300 w-full flex flex-col overflow-hidden p-3 items-center">
            {thumnailPath ? (
              <>
                <Button
                  type="button"
                  className="bg-none outline-none border-none text-base p-0 underline text-right mb-2"
                  onClick={deleteImage}
                >
                  제거
                </Button>
                <img src={thumnailPath} alt={thumnailPath} />
              </>
            ) : (
              <>
                <MdImage className="text-9xl" />
                <Button
                  type="button"
                  onClick={() => upload()}
                  className="mt-4 py-1 px-8 bg-white rounded outline-none border-none cursor-pointer font-bold"
                >
                  이미지 업로드
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </WriteForm>
  );
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, AppError>>();
  const actions = useWriteActions();
  const navigate = useNavigate();
  useEffect(() => {
    if (caught.status === 500) {
      navigate(-1);
      actions.setError(caught.data);
    }
  }, [caught, navigate, actions]);
  return <Thumbnail />;
}
