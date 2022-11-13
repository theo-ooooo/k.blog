import { useState } from "react";
import Button from "../system/Button";
import User from "../vectors/User";
import UserMenu from "./UserMenu";

interface Props {
  nickname: string;
  avatorUrl: string | null;
}

function UserInfo({ nickname, avatorUrl }: Props) {
  const [visible, setVisible] = useState(false);

  const onOpen = () => setVisible(true);
  const onClose = (e?: Event) => {
    e?.preventDefault();
    setVisible(false);
  };

  console.log(111, nickname);

  return (
    <div className="relative flex">
      <Button
        type="button"
        onClick={onOpen}
        className="flex h-9 px-3 justify-center hover:bg-slate-100 items-center rounded-sm"
      >
        <div className="flex items-center">
          {avatorUrl ? (
            <img
              src={avatorUrl}
              alt="me"
              className="object-cover rounded-full w-6 h-6 block mr-2"
            />
          ) : (
            <User className="mr-2 w-5 h-5" />
          )}
          <div className="flex items-center font-semibold">{nickname}</div>
        </div>
      </Button>
      <UserMenu visible={visible} onClose={onClose} />
    </div>
  );
}

export default UserInfo;
