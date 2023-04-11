import { useCallback } from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order } from "../../types/OrdersTypes";

const apiKey = "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4";

interface OrdersResponse {
  data: Order[];
}

interface OrderResponse {
  data: Order;
}

interface ErrorResponse {
  error: string;
}

export const ordersApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://red-candidate-web.azurewebsites.net/api/" }),
  endpoints: (builder) => ({
    fetchOrders: builder.query<OrdersResponse, void>({
      query: (filter) => ({
        url: `Orders/${filter}`,
        headers: { ApiKey: apiKey },
      }),
      providesTags: ['Orders']
    }),
    createOrder: builder.mutation<OrderResponse, Partial<Order>>({
      query: (newOrder) => ({
        url: "Orders",
        method: "POST",
        headers: { ApiKey: apiKey },
        body: newOrder,
      }),
      invalidatesTags: ['Orders']
    }),
    deleteOrders: builder.mutation<void, void>({
      query: () => ({
        url: "Orders/Delete",
        method: "POST",
        headers: { ApiKey: apiKey },
      }),
    }),
  }),
});

export const { useFetchOrdersQuery, useCreateOrderMutation, useDeleteOrdersMutation } =
  ordersApi;

interface FetchOrdersResult {
  data: Order[];
  error: string | null;
  isLoading: boolean;
}

interface CreateOrderResult {
  data: Order | null;
  error: string | null;
  isLoading: boolean;
}

interface DeleteOrdersResult {
  error: string | null;
  isLoading: boolean;
}

export const useFetchOrders = (): [FetchOrdersResult, () => void] => {
  const { data, error, isLoading, refetch } = useFetchOrdersQuery();
  const result: FetchOrdersResult = {
    data: data?.data ?? [],
    error: error?.error ?? null,
    isLoading,
  };
  return [result, refetch];
};

export const useCreateOrder = (): [CreateOrderResult, (newOrder: Partial<Order>) => Promise<void>] => {
  const [mutate, { isLoading }] = useCreateOrderMutation();
  const createOrder = async (newOrder: Partial<Order>): Promise<void> => {
    await mutate(newOrder).unwrap();
  };
  const result: CreateOrderResult = {
    data: null,
    error: null,
    isLoading,
  };
  return [result, createOrder];
};

export const useDeleteOrders = (): [DeleteOrdersResult, () => Promise<void>] => {
  const [mutate, { isLoading }] = useDeleteOrdersMutation();

  const deleteOrders = useCallback(async () => {
    try {
      await mutate();
    } catch (error) {
      console.log(error);
    }
  }, [mutate]);

  return [{ isLoading, error: null }, deleteOrders];
};


