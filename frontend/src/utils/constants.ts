// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
export const BASE_URL = ""; // If using proxy
export const ROUTES = {
  home: "/",
  cart: "/cart",
  profile: "/profile",
  bestsellers: "/bestsellers",
  catalog: "/catalog",
  order: "/order/:orderId",
  product: "/product/:productId",
  earrings: "/catalog/earrings",
  necklaces: "/catalog/necklaces",
  bracelets: "/catalog/bracelets",
  rings: "/catalog/rings",
  giftCertificate: "/catalog/gift-certificate",
  else: "/catalog/else",
  resetPassword: "/passwordreset",
  shipping: "/shipping",
  payment: "/payment",
  placeorder: "/placeorder",
  sign: {
    up: "/register",
    in: "/login",
  },
  admin: {
    products: "/admin/productlist",
    orders: "/admin/orderlist",
    users: "/admin/userlist",
    editUser: "/admin/user/:id/edit",
    product: "/admin/product",
    editProduct: "/admin/product/:id/edit",
  }
};

export const categories = [
  { to: ROUTES.bestsellers, label: "Best Sellers", value: "bestSellers" },
  { to: ROUTES.earrings, label: "Earrings", value: "earrings" },
  { to: ROUTES.necklaces, label: "Necklaces", value: "necklaces" },
  { to: ROUTES.bracelets, label: "Bracelets", value: "bracelets" },
  { to: ROUTES.rings, label: "Rings", value: "rings" },
  { to: ROUTES.giftCertificate, label: "Gift certificates", value: "certificates" },
  { to: ROUTES.else, label: "Else", value: "else" },
];

export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
export const UPLOADS_URL = "/api/upload";

export const slides = [
  {
    src: "../../../../public/images/viva.jpeg",
    alt: "",
    link: "/catalog/earrings",
  },
  {
    src: "../../../../public/images/new_collection.jpg",
    alt: "",
    link: "/catalog/necklaces",
  },
];
