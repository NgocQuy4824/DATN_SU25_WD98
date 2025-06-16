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
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (discount) => `${discount}%`,
        },
        {
            title: 'In Stock',
            key: 'countInStock',
            render: (_, record) => {
                const total = record.variants.reduce((acc, v) => acc + (v.countInStock || 0), 0);
                return total;
            }
        },
        {
            title: 'Variants',
            dataIndex: 'variants',
            key: 'variants',
            width:250,
            render: (variants) => (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    {variants.map((variant, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid #f0f0f0',
                                borderRadius: 6,
                                padding: 6,
                                backgroundColor: '#fafafa',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                    justifyContent:'space-between'
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <Image
                                    width={50}
                                    height={50}
                                    src={variant.image}
                                    style={{ objectFit: 'cover', borderRadius: 4 }}
                                    preview={false}
                                />
                                <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                                    SL: {variant.countInStock ?? 0}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Tag color="blue" style={{ marginBottom: 4 }}>
                                    Color: {variant.color}
                                </Tag>
                                <Tag color="green">
                                    Size: {variant.size}
                                </Tag>
                            </div>
                        </div>
                    ))}
                </div>
            )
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