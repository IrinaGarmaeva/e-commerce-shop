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

export const navItems = [
  { to: ROUTES.bestsellers, label: "Best Sellers" },
  { to: ROUTES.earrings, label: "Earrings" },
  { to: ROUTES.necklaces, label: "Necklaces" },
  { to: ROUTES.bracelets, label: "Bracelets" },
  { to: ROUTES.rings, label: "Rings" },
  { to: ROUTES.giftCertificate, label: "Gift certificate" },
];

export const categories = [
  "Earrings",
  "Necklaces",
  "Rings",
  "Bracelets",
  "Gift certificate",
  "Else"
]

export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
export const UPLOADS_URL = "/api/upload";
