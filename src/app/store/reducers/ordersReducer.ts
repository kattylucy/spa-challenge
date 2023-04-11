import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "src/app/requests/fetchOrders";
import { postOrder } from "src/app/requests/postOrder";
import { Order } from "src/app/types/OrdersTypes";

export interface OrdersState {
  data: Order[];
  loading: boolean;
  error: string | null;
  order: object;
}

const initialState: OrdersState = {
  data: [],
  loading: true,
  error: null,
  order: {},
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
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export default ordersSlice.reducer;
