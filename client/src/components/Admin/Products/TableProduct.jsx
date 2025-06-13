import React from 'react';
import { Button, Image, Popconfirm, Space, Table, Tag } from 'antd';
import { useGetAllProducts } from '../../../hooks/useProductHook.js';
import { useTablePagination } from '../../../hooks/useTablePagination.js';


const TableComponent = ({ onEdit, onDelete }) => {

    const { data: response = [], isLoading } = useGetAllProducts();
    const products = response?.data ?? []; //xử lý trường hợp response không có data

    const { paginatedData, paginationConfig } = useTablePagination(products, 5);
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (img) => <Image width={50} src={img} alt="product" />,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price.toFixed(2)}`,
        },
        {
            title: 'In Stock',
            dataIndex: 'countInStock',
            key: 'countInStock',
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
            key: 'sold',
        },
        {
            title: 'Variants',
            dataIndex: 'variants',
            key: 'variants',
            render: (variants) => (
                <div
                    style={{
                        maxWidth: '200px',
                        maxHeight: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        gap: '4px',
                    }}
                >
                    {variants.map((variant, index) => (
                        <div key={index}>
                            <Tag color="blue" style={{ marginBottom: '4px' }}>
                                Color: {variant.color}
                            </Tag>
                            <Tag color="green">
                                Size: {variant.size}
                            </Tag>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space style={{ display: 'flex' }}>
                    <Button type="primary" onClick={() => onEdit(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa sản phẩm này?"
                        onConfirm={() => onDelete(record?._id)}
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
        <Table rowKey="id" columns={columns} dataSource={paginatedData} isLoading={isLoading} pagination={paginationConfig} />
    );
}
export default TableComponent;