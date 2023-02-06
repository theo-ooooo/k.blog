import { sangte, useSangteActions, useSangteValue } from "sangte";

interface ModalConfig {
  title: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
  onClose?(): void;
  onConfirm?(): void;
}

interface ModalState {
  config: ModalConfig | null;
  visible: boolean;
}

const initialState: ModalState = {
  config: null,
  visible: true,
};

const modalState = sangte(
  initialState,
  (prev) => ({
    open(config: ModalConfig) {
      return {
        visible: true,
        config,
      };
    },
    close() {
      prev.visible = false;
    },
  }),
  { global: true }
);

export function useModalActions() {
  return useSangteActions(modalState);
}

export function useModalValue() {
  return useSangteValue(modalState);
}

export function useOpenModal() {
  const { open } = useModalActions();
  return open;
}
