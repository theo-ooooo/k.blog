import Button from "~/components/system/Button";
import { MdImage } from "react-icons/md";
import useUpload from "~/hooks/useUpload";
import WriteForm from "~/components/write/WriteForm";
import { useCallback, useEffect } from "react";
import { thumbnailUpload } from "~/lib/api/post";
import { useWriteActions, useWriteValue } from "~/states/write";

export default function Thumbnail() {
  const [upload, file] = useUpload();
  const actions = useWriteActions();
  const { thumnailPath } = useWriteValue();
  console.log(thumnailPath);

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
    actions.changeThumbnail("");
  };

  useEffect(() => {
    if (!file) return;
    uploadFn();
  }, [file, uploadFn]);

  return (
    <WriteForm
      onSubmit={(e) => {
        e.preventDefault();
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
