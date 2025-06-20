import React from 'react'
import { useTablePagination } from '../../../hooks/useTablePagination';
import { Table } from 'antd';

const TableUser = ({ users, loading }) => {

  const { paginatedData, paginationConfig } = useTablePagination(users, 5);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'avatar',
      key: 'avatar',
    },
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => record.name
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const color = role === 'admin' ? 'red' : 'green';
        const label = role === 'admin' ? 'Admin' : 'User';
        return <span style={{ color, fontWeight: 'bold' }}>{label}</span>;
      },
    }
  ];

  return (
    <Table rowKey="id" columns={columns} dataSource={paginatedData} loading={loading} pagination={paginationConfig} />
  )
}

export default TableUser