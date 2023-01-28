import { useNavigate, useSearchParams } from "@remix-run/react";
import { useRef } from "react";
import { FiSearch } from "react-icons/fi";

export function SearchArea() {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const initialKeyword = searchParams.get("title") ?? "";

  const onClick = () => {
    ref.current?.focus();
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(`/search?title=${ref.current?.value}`);
    }
  };

  return (
    <div
      className="w-[180px] h-9 pl-3 pr-4 rounded bg-[#f6f6f6] border-1 birder-[#ececec] flex items-center mr-3"
      onClick={onClick}
      onKeyUp={onKeyUp}
    >
      <FiSearch size="18" color="#333" className="cursor-pointer mr-2" />
      <input
        type="text"
        ref={ref}
        className="border-none outline-none flex-1 min-w-0 bg-transparent text-sm"
        defaultValue={initialKeyword}
      />
    </div>
  );
}
