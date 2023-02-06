import { useCallback } from "react";
import { useModalActions, useModalValue } from "~/states/modal";
import Modal from "./system/Modal";

function GlobalModal() {
  const { config, visible } = useModalValue();
  const actions = useModalActions();

  const close = useCallback(() => {
    config?.onClose?.();
    actions.close();
  }, [config, actions]);

  const confirm = useCallback(() => {
    config?.onConfirm?.();
    actions.close();
  }, [config, actions]);

  console.log(111);

  return (
    <Modal
      visible={visible}
      title={config?.title ?? ""}
      content={config?.content ?? ""}
      cancelText={config?.cancelText}
      confirmText={config?.confirmText}
      onClose={close}
      onConfirm={confirm}
    />
  );
}

export default GlobalModal;
