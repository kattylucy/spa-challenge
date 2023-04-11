import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, createOrder } from "src/app/requests/ordersRequest";
import { Order } from "src/app/types/OrdersTypes";

export interface OrdersState {
  data: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  data: [],
  loading: true,
  error: null,
};


const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload]
    });
  },
});

export default ordersSlice.reducer;
