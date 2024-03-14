import { apiSlice } from "./../apiSlices/apiSlice";
import { ORDERS_URL } from "../../../utils/constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    })
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice;
