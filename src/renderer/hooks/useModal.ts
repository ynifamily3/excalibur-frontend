import React from "react";
import { ModalType } from "types/contexts/ModalType";

export default function useModal(): ModalType {
  const [modal, setModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(
    "I'm the Modal Content"
  );

  const handleModal = (content = "기본 모달 내용") => {
    const newState = !modal;
    setModal(newState);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
}
