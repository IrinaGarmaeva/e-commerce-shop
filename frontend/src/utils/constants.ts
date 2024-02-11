export const ROUTES = Object.freeze({
  home: '/',
  cart: '/cart',
  bestsellers: '/bestsellers',
  catalog: "/catalog",
  product: "/catalog/:id",
  earrings: "/catalog/earrings",
  necklaces: "/catalog/neclaces",
  bracelets: "/catalog/bracelets",
  rings: "/catalog/rings",
  giftCertificate: "/catalog/gift-certificate",
  resetPassword: "/passwordreset",
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
