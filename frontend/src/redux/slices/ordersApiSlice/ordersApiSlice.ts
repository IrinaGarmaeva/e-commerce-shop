import { apiSlice } from "./../apiSlices/apiSlice";
import { ORDERS_URL } from "../../../utils/constants";
// import { IOrder } from "../../../types";

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
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
