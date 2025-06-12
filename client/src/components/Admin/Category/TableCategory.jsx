import { Button, Popconfirm, Space, Table } from 'antd';
import React from 'react'
import { useDeleteCategory, useGetAllCategory } from '../../../hooks/useCategoryHook';


const TableCategory = () => {

    const { data: response = [], isLoading } = useGetAllCategory();
    const {mutate: deleteCategory, isLoading : isDeleting} = useDeleteCategory();
    const category = response?.data ?? [];

    const handleDelete = (id) => {
        deleteCategory(id);
    };

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
                        onConfirm={() => handleDelete(record._id)}

                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true, loading: isDeleting }}
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

export default TableCategory;