import React from "react";
import { ModalType } from "types/contexts/ModalType";

export default function useModal(): ModalType {
  const [modal, setModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>();

  const handleModal = (content: React.ReactNode) => {
    const newState = !modal;
    setModal(newState);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
}
