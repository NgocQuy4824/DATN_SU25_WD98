// src/routers/clientRouter.jsx
import ClientLayout from "../layouts/ClientLayout";
import AuthPage from "../pages/Client/Auth/AuthPage";
import Cart from "../pages/Client/Cart/Cart";
import Checkout from "../pages/Client/Checkout/Checkout";
import Shipping from "../pages/Client/Checkout/Shipping";
import HomePage from "../pages/Client/HomePage/HomePage";
import MyVoucher from "../pages/Client/MyVoucher/MyVoucher";
import NotFoundPage from "../pages/Client/NotFoundPage/NotFoundPage";
import ProductsDetailPage from "../pages/Client/ProductsDetailPage/ProductsDetailPage";
import ProductsPage from "../pages/Client/ProductsPage/ProductsPage";
import OrderDetailUser from "../pages/Client/ProfilePage/Order/OrderDetail/OrderDetail";
import OrderPage from "../pages/Client/ProfilePage/Order/OrderPage";
import ProfileForm from "../pages/Client/ProfilePage/ProfileForm";
import ProfilePage from "../pages/Client/ProfilePage/ProfilePage";
import OrderSuccess from "../pages/Client/StateOrder/Success/OrderSuccess";
// import ProfileForm from "../pages/Client/ProfilePage/ProfileForm";
import OrderCancel from "../pages/Client/OrderCancel/OrderCancel";

export const clientRoutes = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <ProductsDetailPage /> },
      { path: "signin", element: <AuthPage /> },
      { path: "signup", element: <AuthPage /> },
      { path: "cart", element: <Cart /> },
      { path: "shipping", element: <Shipping /> },
      { path: "checkout", element: <Checkout /> },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          { path: "", element: <ProfileForm /> },
          { path: "orders", element: <OrderPage /> },
          { path: "orders/detail/:orderId", element: <OrderDetailUser /> },
        ],
      },
      { path: "my-vouchers", element: <MyVoucher /> }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/order/success/:id",
    element: <OrderSuccess />,
  },
  {
    path: "/order/cancel",
    element: <OrderCancel />,
  },
];
export default clientRoutes;
