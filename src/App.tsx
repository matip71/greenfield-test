import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { RootLayout } from '@/layouts/RootLayout/RootLayout';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import ROUTES from '@/routes';

const router = createBrowserRouter([
  // ---- Main layout (header + footer) ----
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.LANDING.path,            element: <Suspense fallback={<Spinner size="lg" />}><ROUTES.LANDING.component /></Suspense> },
      { path: ROUTES.CATALOG.path,            element: <Suspense fallback={<Spinner size="lg" />}><ROUTES.CATALOG.component /></Suspense> },
      { path: ROUTES.PRODUCT_DETAIL.path,     element: <Suspense fallback={<Spinner size="lg" />}><ROUTES.PRODUCT_DETAIL.component /></Suspense> },
      { path: ROUTES.CART.path,               element: <Suspense fallback={<Spinner size="lg" />}><ROUTES.CART.component /></Suspense> },
      { path: ROUTES.CHECKOUT.path,           element: <Suspense fallback={<Spinner size="lg" />}><ROUTES.CHECKOUT.component /></Suspense> },
      { path: ROUTES.ORDER_CONFIRMATION.path, element: <Suspense fallback={<Spinner size="lg" />}><ROUTES.ORDER_CONFIRMATION.component /></Suspense> },
      {
        path: ROUTES.ACCOUNT.path,
        element: <Suspense fallback={<Spinner size="lg" />}><ProtectedRoute><ROUTES.ACCOUNT.component /></ProtectedRoute></Suspense>,
      },
      {
        path: ROUTES.ORDER_HISTORY.path,
        element: <Suspense fallback={<Spinner size="lg" />}><ProtectedRoute><ROUTES.ORDER_HISTORY.component /></ProtectedRoute></Suspense>,
      },
      {
        path: ROUTES.ORDER_DETAIL.path,
        element: <Suspense fallback={<Spinner size="lg" />}><ProtectedRoute><ROUTES.ORDER_DETAIL.component /></ProtectedRoute></Suspense>,
      },
    ],
  },
  // ---- Auth layout (logo-only header, centered content) ----
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.SIGN_IN.path,         element: <Suspense fallback={<Spinner size="lg" />}><ROUTES.SIGN_IN.component /></Suspense> },
      { path: ROUTES.SIGN_UP.path,         element: <Suspense fallback={<Spinner size="lg" />}><ROUTES.SIGN_UP.component /></Suspense> },
      { path: ROUTES.FORGOT_PASSWORD.path, element: <Suspense fallback={<Spinner size="lg" />}><ROUTES.FORGOT_PASSWORD.component /></Suspense> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}
