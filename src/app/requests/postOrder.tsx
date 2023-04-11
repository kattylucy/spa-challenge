import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ApiKey = "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4";

export interface Order {
  createdByUserName: string;
  customerName: string;
  orderId: string;
  orderType: string;
}

export const postOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: Order) => {
    const response = await axios.post(
      "https://red-candidate-web.azurewebsites.net/api/Orders",
      orderData,
      {
        headers: {
          ApiKey: ApiKey,
        },
      }
    );
    return response.data;
  }
);
