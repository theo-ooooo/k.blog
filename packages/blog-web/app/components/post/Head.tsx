// import Tag from "./Tag";

import dayjs from "dayjs";
import type { User } from "~/lib/api/types";

interface Props {
  title: string;
  user: User | null;
  publishId: number;
  publishName: string;
  createdAt: string;
  thumbnail: string | undefined;
}

function Head(props: Props) {
  const { title, user, publishId, createdAt, publishName, thumbnail } = props;
  return (
    <div className="w-full p-6 rounded-md">
      <h1 className="text-gray-900 xl:text-[2.5rem] -tracking-[2.5px] xl:mb-8 sm:mb-3 text-[1.5rem]">
        {title}
      </h1>
      {user?.userId === publishId && (
        <div className="flex justify-end -mb-5 space-x-2">
          <button
            type="button"
            className="p-0 outline-0 border-0 bg-[none] text-[inherit] cursor-pointer text-gray-600 hover:text-gray-900"
          >
            수정
          </button>
          <button
            type="button"
            className="p-0 outline-0 border-0 bg-[none] text-[inherit] cursor-pointer text-gray-600 hover:text-gray-900"
          >
            삭제
          </button>
        </div>
      )}
      <div className="w-full text-base mb-6">
        <span className="font-semibold xl:text-[1rem]">{publishName}</span>
        <span className="my-0 mx-2">&middot;</span>
        <span>{dayjs(createdAt).format("YYYY년 MM월 DD일 HH시mm분")}</span>
      </div>
      {/* <div className="space-x-3">
        {["123", "te1", "te3"].map((tag) => (
          <Tag tag={tag} key={`${tag}`} />
        ))}
      </div> */}
      {thumbnail && (
        <div className="w-full mt-4">
          <img className="w-full" src={thumbnail} alt={title} />
        </div>
      )}
    </div>
  );
}

export default Head;
