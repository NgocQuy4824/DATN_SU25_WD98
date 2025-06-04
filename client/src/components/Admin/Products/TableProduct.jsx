import React from 'react';
import { Button, Image, Space, Table, Tag } from 'antd';
import { useGetAllProducts } from '../../../hooks/useProductHook.js';


const TableComponent = ({ onEdit }) => {

    const { data: response = [], isLoading } = useGetAllProducts();
    const products = response?.data ?? []; //xử lý trường hợp response không có data


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
                    <Button type="link" onClick={() => onEdit(record)}>Sửa</Button>
                    <Button type="primary" danger>Xóa</Button>
                </Space>
            ),
        },
    ];



    return (
        <Table rowKey="id" columns={columns} dataSource={products} isLoading={isLoading} />
    );
}
export default TableComponent;