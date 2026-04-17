import { lazy } from 'react';

// Explicit route registry — all lazy-loaded page components by name
const ROUTES = {
  LANDING: {
    path: '/',
    component: lazy(() => import('@/pages/LandingPage')),
  },
  CATALOG: {
    path: '/products',
    component: lazy(() => import('@/pages/CatalogPage')),
  },
  PRODUCT_DETAIL: {
    path: '/products/:slug',
    component: lazy(() => import('@/pages/ProductDetailPage')),
  },
  CART: {
    path: '/cart',
    component: lazy(() => import('@/pages/CartPage')),
  },
  CHECKOUT: {
    path: '/checkout',
    component: lazy(() => import('@/pages/CheckoutPage')),
  },
  ORDER_CONFIRMATION: {
    path: '/order/confirmation',
    component: lazy(() => import('@/pages/OrderConfirmationPage')),
  },
  SIGN_IN: {
    path: '/auth/sign-in',
    component: lazy(() => import('@/pages/SignInPage')),
  },
  SIGN_UP: {
    path: '/auth/sign-up',
    component: lazy(() => import('@/pages/SignUpPage')),
  },
  FORGOT_PASSWORD: {
    path: '/auth/forgot-password',
    component: lazy(() => import('@/pages/ForgotPasswordPage')),
  },
  ACCOUNT: {
    path: '/account',
    component: lazy(() => import('@/pages/AccountPage')),
  },
  ORDER_HISTORY: {
    path: '/account/orders',
    component: lazy(() => import('@/pages/OrderHistoryPage')),
  },
  ORDER_DETAIL: {
    path: '/account/orders/:id',
    component: lazy(() => import('@/pages/OrderDetailPage')),
  },
} as const;

export default ROUTES;
