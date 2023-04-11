import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastState {
  message: string;
  severity: "success" | "warning" | "info" | "error" | undefined;
  isOpen: boolean;
}

const initialState: ToastState = {
  message: "",
  severity: undefined,
  isOpen: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<ToastState>) {
      const { message, severity, isOpen } = action.payload;

      state.message = message;
      state.severity = severity;
      state.isOpen = isOpen;
    },
    hideToast(state) {
      state.isOpen = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
