import { PRODUCTS_URL} from "../../../utils/constants";
import { apiSlice } from "../apiSlices/apiSlice";

export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`
        // url: `${USERS_URL}/${productId}`
      }),
      keepUnusedDataFor: 5,
    })
  }),
});

export const {useGetProductsQuery, useGetProductDetailsQuery} = productsSlice;
