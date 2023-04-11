import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order } from "../../types/OrdersTypes";

const apiKey = "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4";

interface OrdersResponse {
  data: Order[];
}

interface OrderResponse {
  data: Order;
}
export const ordersApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({ baseUrl: "https://red-candidate-web.azurewebsites.net/api/" }),
  tagTypes: ['Orders'], 
  endpoints: (builder) => ({
    fetchOrders: builder.query<OrdersResponse, string | void>({
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
    deleteOrders: builder.mutation<void, string[]>({
      query: (selectedOrders) => ({
        url: "Orders/Delete",
        method: "POST",
        headers: { ApiKey: apiKey },
        body: selectedOrders
      }),
      invalidatesTags: ['Orders']
    }),
    updateOrder: builder.mutation<OrderResponse, { id: string, order: Partial<Order> }>({
      query: ({ id, order }) => ({
        url: `Orders/${id}`,
        method: "PUT",
        headers: { ApiKey: apiKey },
        body: order,
      }),
      invalidatesTags: ['Orders']
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

export const useFetchOrders = (filter?: string): [FetchOrdersResult, () => void] => {
  const { data, error, isLoading, refetch } = useFetchOrdersQuery(filter);
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

export const useDeleteOrders = (): [(selectedOrders: string[]) => Promise<void>, DeleteOrdersResult] => {
  const [mutate, { isLoading }] = useDeleteOrdersMutation();
  const deleteOrders = async (orders: string[]): Promise<void> => {
    await mutate(orders).unwrap();
  };

  return [deleteOrders, { isLoading, error: null }];
};


