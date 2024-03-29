import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { ROUTES } from "./utils/constants.ts";
import "./index.css";
import Home from "./components/pages/Home/Home.tsx";
import Login from "./components/pages/Login/Login.tsx";
import Register from "./components/pages/Register/Register.tsx";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword.tsx";
import Product from "./components/pages/Product/Product.tsx";
import Cart from "./components/pages/Cart/Cart.tsx";
import Profile from "./components/pages/Profile/Profile.tsx";
import Shipping from "./components/pages/Shipping/Shipping.tsx";
import ProtectedRoute from "./components/design-system/ProtectedRoute/ProtectedRoute.tsx";
import AdminRoute from "./components/design-system/AdminRoute/AdminRoute.tsx";
import Payment from "./components/pages/Payment/Payment.tsx";
import PlaceOrder from "./components/pages/PlaceOrder/PlaceOrder.tsx";
import Order from "./components/pages/Order/Order.tsx";
import OrderList from "./components/pages/OrderList/OrderList.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path={ROUTES.home} element={<Home />} />
      <Route path={ROUTES.sign.in} element={<Login />} />
      <Route path={ROUTES.sign.up} element={<Register />} />
      <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
      <Route path={ROUTES.product} element={<Product />} />
      <Route path={ROUTES.cart} element={<Cart />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path={ROUTES.shipping} element={<Shipping />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={ROUTES.payment} element={<Payment />} />
        <Route path={ROUTES.placeorder} element={<PlaceOrder />} />
        <Route path={ROUTES.order} element={<Order />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path={ROUTES.admin.orders} element={<OrderList />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer />
  </React.StrictMode>
);
