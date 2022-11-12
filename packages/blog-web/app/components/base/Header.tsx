import { Link } from "@remix-run/react";
import { FiSearch } from "react-icons/fi";
import Logo from "./Logo";

function Header() {
  return (
    <div className="w-[100%] h-[62px] fixed z-[999] flex align-center bg-white border-b">
      <div className="my-0 mx-auto flex items-center justify-start relative w-[100%] 2xl:w-[1536px] 2xl:justify-center px-[2rem]">
        <Logo />
        <div className="absolute right-[2rem]">
          <Link to="/search">
            <FiSearch size="22" color="#333" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
