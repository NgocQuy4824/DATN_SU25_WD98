// src/routers/clientRouter.jsx
import ClientLayout from "../layouts/ClientLayout";
import SignInPage from "../pages/Client/Auth/SignIn/SignInPage";
import SignUpPage from "../pages/Client/Auth/SignUp/SignUpPage";
import Cart from "../pages/Client/Cart/Cart";
import Checkout from "../pages/Client/Checkout/Checkout";
import Shipping from "../pages/Client/Checkout/Shipping";
import HomePage from "../pages/Client/HomePage/HomePage";
import NotFoundPage from "../pages/Client/NotFoundPage/NotFoundPage";
import ProductsDetailPage from "../pages/Client/ProductsDetailPage/ProductsDetailPage";
import ProductsPage from "../pages/Client/ProductsPage/ProductsPage";
import OrderDetailUser from "../pages/Client/ProfilePage/Order/OrderDetail/OrderDetail";
import OrderPage from "../pages/Client/ProfilePage/Order/OrderPage";
import ProfileForm from "../pages/Client/ProfilePage/ProfileForm";
import ProfilePage from "../pages/Client/ProfilePage/ProfilePage";
import OrderSuccess from "../pages/Client/StateOrder/Success/OrderSuccess";
// import ProfileForm from "../pages/Client/ProfilePage/ProfileForm";

export const clientRoutes = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <ProductsDetailPage /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
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
  // {
  //   path: "/order/error",
  // },
];
export default clientRoutes;
