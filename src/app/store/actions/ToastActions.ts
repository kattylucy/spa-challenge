import { Dispatch } from "@reduxjs/toolkit";
import { showToast, hideToast } from "src/app/store/reducers/toastReducer";

interface ToastData {
  message: string,
  status: "success" | "warning" | "info" | "error" | undefined
}

export const toast = (toastData: ToastData, dispatch: Dispatch) => {
  const { message, status } = toastData;
  dispatch(showToast({ message, severity: status, isOpen: true }));

  setTimeout(() => {
    dispatch(hideToast());
  }, 3000);
};

