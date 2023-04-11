import { ThunkAction, Dispatch } from "redux-thunk";
import { showToast, hideToast } from "src/app/store/reducers/toastReducer";

export const showSuccessToast = (message: string) => {
  return (dispatch: Dispatch) => {
    console.log('message', message)
    dispatch(showToast({ message, severity: "success", isOpen: true }));

    setTimeout(() => {
      dispatch(hideToast());
    }, 3000);
  };
};

export const showErrorToast = (message: string) => {
  return (dispatch: Dispatch) => {
    dispatch(showToast({ message, severity: "error", isOpen: true }));

    setTimeout(() => {
      dispatch(hideToast());
    }, 3000);
  };
};
