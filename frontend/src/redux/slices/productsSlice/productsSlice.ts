import { PRODUCTS_URL } from "../../../utils/constants";
import { apiSlice } from "../apiSlices/apiSlice";
import { IProduct } from "../../../types";
import { ObjectId } from "mongoose";

export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query<IProduct, ObjectId | string>({
      query: (productId: string) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation<void, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"], // stop it from being cached - so we have fresh data. Without this, we would have to reload the page
    }),
    updateProduct: builder.mutation({
      query: (data: IProduct) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ["Product"],
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation
} = productsSlice;
