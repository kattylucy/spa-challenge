import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, SnackbarCloseReason } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { hideToast } from "src/app/store/reducers/toastReducer";

interface ToastProps {}

export const Toast: React.FC<ToastProps> = () => {
  const dispatch = useDispatch();
  const { isOpen, message, severity } = useSelector(
    (state: any) => state.toast
  );

  const handleClose = (
    event: React.SyntheticEvent<any>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideToast());
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
