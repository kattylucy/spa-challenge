import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "src/app/types/OrdersTypes";
import axios from "axios";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (filter: string, thunkAPI) => {
    try {
      const ApiKey = "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4";
      const url = `https://red-candidate-web.azurewebsites.net/api/Orders/${filter}`;
      const response = await axios.get(url, {
        headers: {
          ApiKey: ApiKey,
        },
      });
      return response.data as Order[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
