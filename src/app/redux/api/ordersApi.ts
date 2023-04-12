import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order } from "../../types/OrdersTypes";

const apiKey = "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4";

interface OrderResponse {
  data: Order;
}

export const ordersApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({ baseUrl: "https://red-candidate-web.azurewebsites.net/api/" }),
  tagTypes: ['Orders'], 
  endpoints: (builder) => ({
    fetchOrders: builder.query<[], string | void>({
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
  }),
});

export const { useFetchOrdersQuery, useCreateOrderMutation, useDeleteOrdersMutation } =
  ordersApi;