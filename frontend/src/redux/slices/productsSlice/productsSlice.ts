import { PRODUCTS_URL, UPLOADS_URL } from "../../../utils/constants";
import { apiSlice } from "../apiSlices/apiSlice";
import { IProduct, IUpdatedProduct } from "../../../types";
import { ObjectId } from "mongoose";

export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], {keyword: string}>({
      query: ({keyword}) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
        }
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProductDetails: builder.query<IProduct, ObjectId | string>({
      query: (productId: string) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<void, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"], // stop it from being cached - so we have fresh data. Without this, we would have to reload the page
    }),
    updateProduct: builder.mutation({
      query: (data: IUpdatedProduct) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOADS_URL,
        method: "POST",
        body: data,
      })
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation
} = productsSlice;
