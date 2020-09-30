import React from "react";
import useModal from "hooks/useModal";
import Modal from "components/molecules/Modal";
import { ModalType } from "types/contexts/ModalType";

let ModalContext: React.Context<ModalType>;
const { Provider } = (ModalContext = React.createContext<ModalType>(null));

const ModalProvider: React.FC = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { modal, handleModal, modalContent } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {children ? children : ""}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
