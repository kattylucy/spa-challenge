import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";

const ApiKey = "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4";

interface RequestOptions extends AxiosRequestConfig {
  endpoint: string;
}

const makeRequest = (options: RequestOptions) => {
  const { method, endpoint, ...config } = options;
  return createAsyncThunk(`orders/${method.toLowerCase()}Order`, async (data?: any) => {
    const response = await axios({
      method: method,
      url: `https://red-candidate-web.azurewebsites.net/api/Orders/${endpoint}`,
      headers: {
        ApiKey: ApiKey,
      },
      ...config,
      data: data,
    });
    return response.data;
  });
};

export const fetchOrders = makeRequest({ method: "GET", endpoint: "" });
export const filterOrders = (filter: string) =>
  makeRequest({ method: "GET", endpoint: `?${filter}` });
export const createOrder = makeRequest({ method: "POST", endpoint: "" });
export const deleteOrders = makeRequest({ method: "POST", endpoint: "Delete" });
