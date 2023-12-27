import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import useAdminAuth from "../hooks/useAdminAuth";
import Coupon from "../pages/coupon/Coupon";
import EditCoupon from "../pages/coupon/EditCoupon";

const Error = lazy(() => import("../pages/Error"));
const Login = lazy(() => import("../pages/Login"));
const Layout = lazy(() => import("../layouts/Layout"));
const Register = lazy(() => import("../pages/Register"));
const Orders = lazy(() => import("../pages/order/Orders"));
const Banner = lazy(() => import("../pages/banner/Banner"));
const Products = lazy(() => import("../pages/product/Products"));
const Category = lazy(() => import("../pages/category/Category"));
const Customer = lazy(() => import("../pages/customer/Customer"));
const Variants = lazy(() => import("../pages/attribute/Variants"));
const Attribute = lazy(() => import("../pages/attribute/Attribute"));
const OrderDetails = lazy(() => import("../pages/order/OrderDetails"));
const ViewProduct = lazy(() => import("../pages/product/ViewProduct"));
const EditProduct = lazy(() => import("../pages/product/EditProduct"));
const EditCustomer = lazy(() => import("../pages/customer/EditCustomer"));
const ViewCustomer = lazy(() => import("../pages/customer/ViewCustomer"));
const EditVariant = lazy(() => import("../pages/attribute/EditVariant"));
const EditCategory = lazy(() => import("../pages/category/EditCategory"));
const EditBanner = lazy(() => import("../pages/banner/EditBanner"));
const EditAttribute = lazy(() => import("../pages/attribute/EditAttribute"));
const SubCategory = lazy(() => import("../pages/category/SubCategory"));
const SubSubCategory = lazy(() => import("../pages/category/SubSubCategory"));
const NotFoundPage404 = lazy(() => import("../pages/404"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const { isAuth } = useAdminAuth();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:id/view",
        element: (
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/product/:id/edit",
        element: (
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/product/:id/view",
        element: (
          <PrivateRoute>
            <ViewProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/category",
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },
      {
        path: "/customer",
        element: (
          <PrivateRoute>
            <Customer />
          </PrivateRoute>
        ),
      },
      {
        path: "/customer/:id/edit",
        element: (
          <PrivateRoute>
            <EditCustomer />
          </PrivateRoute>
        ),
      },
      {
        path: "/customer/:id/view",
        element: (
          <PrivateRoute>
            <ViewCustomer />
          </PrivateRoute>
        ),
      },
      {
        path: "/category/:id/edit",
        element: (
          <PrivateRoute>
            <EditCategory />
          </PrivateRoute>
        ),
      },
      {
        path: "/category/:id/sub-category",
        element: (
          <PrivateRoute>
            <SubCategory />
          </PrivateRoute>
        ),
      },
      {
        path: "/category/:id/:subId/sub/sub-category",
        element: (
          <PrivateRoute>
            <SubSubCategory />
          </PrivateRoute>
        ),
      },
      {
        path: "/attribute",
        element: (
          <PrivateRoute>
            <Attribute />
          </PrivateRoute>
        ),
      },
      {
        path: "/attribute/:id/edit",
        element: (
          <PrivateRoute>
            <EditAttribute />
          </PrivateRoute>
        ),
      },
      {
        path: "/attribute/:id/variants",
        element: (
          <PrivateRoute>
            <Variants />
          </PrivateRoute>
        ),
      },
      {
        path: "/attribute/:attId/variants/:id/edit",
        element: (
          <PrivateRoute>
            <EditVariant />
          </PrivateRoute>
        ),
      },
      {
        path: "/banner",
        element: (
          <PrivateRoute>
            <Banner />
          </PrivateRoute>
        ),
      },
      {
        path: "/banner/:id/edit",
        element: (
          <PrivateRoute>
            <EditBanner />
          </PrivateRoute>
        ),
      },
      {
        path: "/coupons",
        element: (
          <PrivateRoute>
            <Coupon />
          </PrivateRoute>
        ),
      },
      {
        path: "/coupon/:id/edit",
        element: (
          <PrivateRoute>
            <EditCoupon />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "*",
      //   element: (
      //     <PrivateRoute>
      //       <NotFoundPage404 />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
  {
    path: "/login",
    element: isAuth ? <Navigate to="/" /> : <Login />,
  },
  {
    path: "/register",
    element: isAuth ? <Navigate to="/" /> : <Register />,
  },
  {
    path: "/forgot-password",
    element: isAuth ? <Navigate to="/" /> : <ForgotPassword />,
  },
  {
    path: "*",
    element: <NotFoundPage404 />,
  },
]);

export default router;
