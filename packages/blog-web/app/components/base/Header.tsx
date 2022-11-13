import { Link } from "@remix-run/react";
import { FiSearch } from "react-icons/fi";
import { useUser } from "~/states/user";
import Logo from "./Logo";
import UserInfo from "./UserInfo";

function Header() {
  const user = useUser();
  console.log(user);

  return (
    <div className="w-[100%] h-[62px] fixed z-[999] flex align-center bg-white border-b">
      <div className="my-0 mx-auto flex items-center justify-between relative w-[100%] 2xl:w-[1536px] px-[2rem]">
        <Logo />
        <div className="flex items-center justify-between">
          <Link to="/search" className="mr-3">
            <FiSearch size="22" color="#333" />
          </Link>
          {user ? (
            <UserInfo nickname={user.nickname!} avatorUrl={user.avatorUrl!} />
          ) : (
            <Link
              to="/auth/login"
              className="px-3 h-9 text-md font-medium tracking-[-1px] flex justify-center items-center hover:bg-slate-100 hover:rounded-sm"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
