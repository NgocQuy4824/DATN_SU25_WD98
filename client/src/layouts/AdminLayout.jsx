import React from 'react';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent'
import { Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  AlignCenterOutlined,
  HighlightOutlined
} from '@ant-design/icons';

const items = [
  {
    key: 'products',
    label: 'Sản phẩm',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'users',
    label: 'Người dùng',
    icon: <UserOutlined />,
  },
  {
    key: 'orders',
    label: 'Đơn hàng',
    icon: <ShoppingCartOutlined />,
  },
  {
    key: 'variants',
    label: 'Quản lý biến thể',
    icon: <BarChartOutlined />,
    children: [
      {
        icon:<AlignCenterOutlined />,
        key: 'variants/category',
        label: 'Danh mục',
      },
      {
        icon:<HighlightOutlined />,
        key: 'variants/size',
        label: 'Màu sắc',
      },
    ],
  },
  {
    key: 'statistics',
    label: 'Thống kê',
    icon: <PieChartOutlined />,
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    navigate(`/system/admin/${key}`);
  };

  return (
    <>
      <HeaderComponent isAdmin={true} />
      <div style={{ display: 'flex' }}>
        <Menu
          onClick={handleMenuClick}
          style={{ width: 200 }}
          mode="inline"
          items={items}
        />
        <div style={{ flex: 1, padding: 16 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
