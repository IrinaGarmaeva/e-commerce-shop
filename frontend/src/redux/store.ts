import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlices/apiSlice";
import cartSliceReducer from './slices/cartSlice/cartSlice';
import authSliceReducer from './slices/authSlice/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
