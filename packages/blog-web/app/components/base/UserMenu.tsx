import { useNavigate } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { useOnClickOutside } from "~/hooks/useClickOutside";
import { useLogout } from "~/hooks/useLogout";

interface Props {
  visible: boolean;
  onClose(e?: Event): void;
}

function UserMenu({ visible, onClose }: Props) {
  const navigate = useNavigate();
  const logout = useLogout();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    onClose(e);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            duration: 0.125,
          }}
          onClick={() => onClose()}
          className="absolute right-0 top-12 bg-white w-[200px] border-gray-400 border-[1px] shadow-md"
          ref={ref}
        >
          <div
            className="p-4 cursor-pointer hover:transition-all hover:ease-in hover:duration-100 hover:bg-slate-100"
            onClick={() => navigate("/write")}
          >
            새 글 등록
          </div>
          <div
            className="p-4 cursor-pointer hover:transition-all hover:ease-in hover:duration-100 hover:bg-slate-100"
            onClick={logout}
          >
            로그아웃
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default UserMenu;
