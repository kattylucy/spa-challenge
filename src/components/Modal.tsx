import * as React from "react";
import Dialog from "@mui/material/Dialog";

interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
  visible: boolean;
}

export const Modal = ({
  children,
  toggleModal,
  visible,
  ...props
}: ModalProps) => {
  return (
    <Dialog open={visible} onClose={toggleModal} {...props}>
      {children}
    </Dialog>
  );
};
