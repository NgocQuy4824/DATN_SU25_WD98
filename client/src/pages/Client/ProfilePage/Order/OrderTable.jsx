import React from 'react';
import { Table, Tag, Button } from 'antd';

const OrderTable = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
    },
    {
      title: 'Hình thức thanh toán',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch(status) {
          case 'Đã giao': color = 'purple'; break;
          case 'Đã hủy': color = 'red'; break;
          case 'Chờ xác nhận': color = 'default'; break;
          case 'Đã xác nhận': color = 'blue'; break;
          case 'Hoàn thành': color = 'green'; break;
          default: color = 'default';
        }
        return <Tag color={color}>{status}</Tag>
      }
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Button type="primary" size="small">Xem chi tiết</Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: '686e3f84ace6ab2094a07ab5',
      payment: 'Thanh toán khi nhận hàng (COD)',
      price: '986.501 ₫',
      status: 'Đã giao',
      date: '09/07/2025 05-08',
    },
    {
      key: '2',
      id: '686cf078e9239b09e378cd98',
      payment: 'Thanh toán online',
      price: '986.501 ₫',
      status: 'Đã hủy',
      date: '08/07/2025 05-18',
    },
    {
      key: '3',
      id: '686c80a43e43e63507bc8e96',
      payment: 'Thanh toán khi nhận hàng (COD)',
      price: '986.501 ₫',
      status: 'Chờ xác nhận',
      date: '08/07/2025 09-21',
    },
    {
      key: '4',
      id: '686b920d96115f11c587e206',
      payment: 'Thanh toán khi nhận hàng (COD)',
      price: '1.010.945 ₫',
      status: 'Đã xác nhận',
      date: '07/07/2025 04-23',
    },
    {
      key: '5',
      id: '686b31b23d249437ebdb56e5',
      payment: 'Thanh toán khi nhận hàng (COD)',
      price: '60.945 ₫',
      status: 'Hoàn thành',
      date: '07/07/2025 09-32',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default OrderTable;
