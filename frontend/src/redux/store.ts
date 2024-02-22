import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlices/apiSlice";
import cartSliceReducer from './slices/cartSlice/cartSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store;
