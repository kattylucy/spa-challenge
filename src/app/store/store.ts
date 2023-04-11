import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./reducers/ordersReducer";
import toastReducer from "./reducers/toastReducer";

export const store = configureStore({
    reducer: {
        orders: ordersReducer,
        toast: toastReducer
    }
});

