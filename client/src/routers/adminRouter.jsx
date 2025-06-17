import AdminLayout from "../layouts/AdminLayout.jsx";
import Products from "../components/Admin/Products/Products.jsx";
import User from "../components/Admin/Users/User.jsx";
import Order from "../components/Admin/Orders/Order.jsx";
import Category from "../components/Admin/Variants/Category/Category.jsx";
import Statistic from "../components/Admin/Statistic/Statistic.jsx";
import Variants from "../components/Admin/Variants/Variants.jsx";
import Size from "../components/Admin/Variants/Size/Size.jsx";



export const adminRoutes = [
  {
    path: '/system/admin',
    element: <AdminLayout />,
    children: [
      { path: 'products', element: <Products /> },
      { path: 'users', element: <User /> },
      { path: 'orders', element: <Order /> },
      { path: 'variants', element: <Variants />,
        children: [
          { path: 'category', element: <Category /> },
          { path: 'size' , element: <Size/> }
        ]
       },
      { path: 'statistics', element: <Statistic /> },
    ],
  },
];