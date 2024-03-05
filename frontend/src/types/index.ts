export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  quantity?: number;
}

export interface ICartState {
  cartItems: IProduct[];
  itemsPrice?: string;
  shippingPrice?: string;
  taxPrice?: string;
  totalPrice?: string;
  shippingAddress?: IShippingDetails;
  paymentMethod?: string;
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
