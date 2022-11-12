import { Link } from "@remix-run/react";

function Logo() {
  return (
    <div className="font-['Cabin'] text-3xl text-center">
      <Link to={"/"} className="tracking-[-1.5px] text-2xl">
        Kblog
      </Link>
    </div>
  );
}

export default Logo;
