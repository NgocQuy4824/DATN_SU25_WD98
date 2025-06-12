import { Button, Popconfirm, Space, Table } from 'antd';
import React from 'react'
import { useGetAllCategory } from '../../../hooks/useCategoryHook';

const TableCategory = () => {

    const { data: response = [], isLoading } = useGetAllCategory();
    const category = response?.data ?? [];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space style={{ display: 'flex' }}>
                    <Button type="link" >Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa danh mục này?"

                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button type="primary" danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


  return (
   <Table
        rowKey="id"
        columns={columns}
        dataSource={category}
        isLoading={isLoading}
    />
  )
}

export default TableCategory