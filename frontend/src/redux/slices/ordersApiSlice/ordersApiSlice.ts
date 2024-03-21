import { apiSlice } from "./../apiSlices/apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../../../utils/constants";

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
    }),
    payOrderByCard: builder.mutation({
      query: ({orderId, details}) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
      invalidatesTags: ["Order"],
    }),
    confirmOrder: builder.mutation({
      query: ({orderId, details}) => ({
        url: `${ORDERS_URL}/${orderId}/confirm`,
        method: "PUT",
        body: { ...details },
      }),
      invalidatesTags: ["Order"],
    }),
    payOrderByCertificate: builder.mutation({
      query: ({orderId, details}) => ({
        url: `${ORDERS_URL}/${orderId}/paybycertificate`,
        method: "PUT",
        body: { ...details },
      }),
      invalidatesTags: ["Order"],
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),
    getMyOrders : builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    })
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderByCardMutation, useConfirmOrderMutation, useGetPayPalClientIdQuery, useGetMyOrdersQuery, usePayOrderByCertificateMutation } = ordersApiSlice;
