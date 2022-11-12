import { Link } from "@remix-run/react";

function PostCard() {
  return (
    <Link
      to={"/post/1"}
      className="block w-[100%] overflow-hidden text-black bg-white shadow-md rounded-md"
    >
      {/* 썸네일 영역 */}
      <div className="pt-[52.1921%] w-[100%] relative">
        <img
          src="https://images.veltrends.com/item/89/-AgXCrIomisvCFItz518k.png"
          alt="img"
          className="absolute top-0 left-0 w-[100%] h-[100%] block object-cover"
        />
      </div>
      {/* 콘텐츠 영역 */}
      <div className="p-4 flex flex-1 flex-col tracking-[-1.3px] mb-1">
        <h2 className="text-xl break-words text-ellipsis whitespace-nowrap overflow-hidden">
          제목입니다.
        </h2>
        <p className="mb-6 break-words text-sm h-14 overflow-hidden text-ellipsis text-gray-400">
          내용입니다.
        </p>
      </div>
      {/* 날짜 영역 */}
      <div className="py-2.5 px-4 text-xs tracking-[-1.2px] text-gray-900 flex justify-end">
        <p>2022년 11월 12일 3시 10분</p>
      </div>
      <div className="py-2.5 px-4 border-t-[1px] border-gray-200 border-solid flex text-xs justify-end tracking-[-1.3px]">
        <div className="decoration-0 text-inherit flex items-center">
          <img
            src="https://lh3.googleusercontent.com/ogw/AOh-ky1yRVEa5--3qw_GyH4fwIW-WddBt-v9HCciWEBK=s32-c-mo"
            alt="me"
            className="object-cover rounded-full w-6 h-6 block mr-2"
          />
          <span>
            by <strong>강경원</strong>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
