import mongoose from "mongoose";
export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  countInStock: number;
  quantity?: number;
}

export interface IUpdatedProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  countInStock: number;
}

export interface ICartState {
  cartItems: IProduct[];
  itemsPrice?: string;
  shippingPrice?: string;
  taxPrice?: string;
  totalPrice?: string;
  shippingAddress?: IShippingDetails;
  paymentMethod?: string;
  promocode?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IShippingDetails {
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface IOrder {
  _id?: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingDetails;
  paymentMethod: "PayPal" | "Gift Certificate" | "Cash on Delivery" | string;
  itemsPrice: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;

  createdAt?: string;
  isDelivered?: boolean;
  isPaid?: boolean;
  paidAt?: string;
  isConfirmed?: boolean;
  deliveredAt?: string;
  updatedAt?: string;
  promocode?: string; // ???
  user: IUser;
}

export interface IOrderItem {
  _id: mongoose.Schema.Types.ObjectId;
  image: string;
  name: string;
  price: number;
  product: mongoose.Schema.Types.ObjectId;
  quantity?: number;
}
