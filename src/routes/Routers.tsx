import { createBrowserRouter } from 'react-router-dom';
import RouteEnum from '../enums/route.enum';
import { Layout } from '../components/layout/Layout/Layout';
import NotFound from '../pages/404/NotFound';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import InquiriesPage from '../pages/inquiries/InquiriesPage';
import BookingsPage from '../pages/bookings/BookingsPage';
import ProductsPage from '../pages/products/ProductsPage';
import ProductFormPage from '../pages/products/ProductFormPage';
import UsersPage from '../pages/users/UsersPage';

const router = createBrowserRouter([
  {
    path: RouteEnum.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: RouteEnum.INQUIRIES, element: <InquiriesPage /> },
      { path: RouteEnum.BOOKINGS, element: <BookingsPage /> },
      { path: RouteEnum.PRODUCTS, element: <ProductsPage /> },
      { path: RouteEnum.PRODUCT_NEW, element: <ProductFormPage /> },
      { path: `${RouteEnum.PRODUCTS}/:productId`, element: <ProductFormPage /> },
      { path: RouteEnum.USERS, element: <UsersPage /> },
    ],
  },
  { path: RouteEnum.LOGIN, element: <LoginPage /> },
  { path: RouteEnum.NOT_FOUND, element: <NotFound /> },
], { basename: import.meta.env.BASE_URL });

export default router;
