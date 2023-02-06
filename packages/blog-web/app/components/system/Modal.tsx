import Button from "./Button";
import cn from "classnames";

interface Props {
  visible: boolean;
  title: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
  onClose(): void;
  onConfirm(): void;
}
function Modal({
  visible,
  title,
  content,
  cancelText,
  confirmText,
  onClose,
  onConfirm,
}: Props) {
  return (
    <div
      className={cn(
        "absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[375px] max-w-[calc(100vw-32px)] py-6 px-4 bg-white rounded",
        { hidden: !visible }
      )}
    >
      <h3 className="mt-0 mb-2 text-lg font-semibold">{title}</h3>
      <p className="my-0 text-base mb-6">{content}</p>
      <div className="flex gap-2 justify-end">
        {cancelText && (
          <Button type="button" onClick={onClose}>
            {cancelText}
          </Button>
        )}
        <Button type="button" onClick={onConfirm}>
          {confirmText ?? "확인"}
        </Button>
      </div>
    </div>
  );
}

export default Modal;
