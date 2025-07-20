// src/routers/clientRouter.jsx
import React from "react";
import ClientLayout from "../layouts/ClientLayout";
import HomePage from "../pages/Client/HomePage/HomePage";
import ProductsPage from "../pages/Client/ProductsPage/ProductsPage";
import ProductsDetailPage from "../pages/Client/ProductsDetailPage/ProductsDetailPage";
import SignInPage from "../pages/Client/Auth/SignIn/SignInPage";
import SignUpPage from "../pages/Client/Auth/SignUp/SignUpPage";
import NotFoundPage from "../pages/Client/NotFoundPage/NotFoundPage";
import ProfilePage from "../pages/Client/ProfilePage/ProfilePage";
import Cart from "../pages/Client/Cart/Cart";
import ProfileForm from "../pages/Client/ProfilePage/ProfileForm";
import OrderPage from "../pages/Client/ProfilePage/Order/OrderPage";
import Shipping from "../pages/Client/Checkout/Shipping";
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
      { path: 'shipping', element: <Shipping/>},
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          { path: "", element: <ProfileForm /> },
          { path: "orders", element: <OrderPage/> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
export default clientRoutes;
