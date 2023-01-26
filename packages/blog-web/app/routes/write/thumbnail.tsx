import Button from "~/components/system/Button";
import { MdImage } from "react-icons/md";
import useUpload from "~/hooks/useUpload";
import WriteForm from "~/components/write/WriteForm";
import { useCallback, useEffect } from "react";
import { thumbnailUpload } from "~/lib/api/post";

export default function Thumbnail() {
  const [upload, file] = useUpload();

  const uploadFn = useCallback(async () => {
    if (!file) return;
    const data = await thumbnailUpload(file);
    console.log(data);
  }, [file]);

  useEffect(() => {
    if (!file) return;
    uploadFn();
  }, [file, uploadFn]);

  const img =
    "https://camo.githubusercontent.com/905ed7159ac9f1f96549d4dd39600ff019d3535b3cbfb60b38b617d8e17d21c9/68747470733a2f2f692e706f7374696d672e63632f4a30584d50484e512f706c616e62792d6c6f676f2e706e67";
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
            {!img ? (
              <>
                <Button
                  type="button"
                  className="bg-none outline-none border-none text-base p-0 underline text-right mb-2"
                >
                  제거
                </Button>
                <img src={img} alt="11111" />
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
