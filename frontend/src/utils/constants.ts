// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
export const BASE_URL = ''; // If using proxy
export const ROUTES = Object.freeze({
  home: '/',
  cart: '/cart',
  profile: '/profile',
  bestsellers: '/bestsellers',
  catalog: "/catalog",
  product: "/:id",
  earrings: "/catalog/earrings",
  necklaces: "/catalog/neclaces",
  bracelets: "/catalog/bracelets",
  rings: "/catalog/rings",
  giftCertificate: "/catalog/gift-certificate",
  resetPassword: "/passwordreset",
  shipping: "/shipping",
  payment: "/payment",
  sign: {
    up: '/register',
    in: '/login',
  },
});

export const navItems = [
  { to: ROUTES.bestsellers, label: 'Best Sellers' },
  { to: ROUTES.earrings, label: 'Earrings' },
  { to: ROUTES.necklaces, label: 'Necklaces' },
  { to: ROUTES.bracelets, label: 'Bracelets' },
  { to: ROUTES.rings, label: 'Rings' },
  { to: ROUTES.giftCertificate, label: 'Gift certificate' },
];

export const PRODUCTS_URL = 'api/products'
export const USERS_URL = 'api/users'
export const ORDERS_URL = 'api/orders'
