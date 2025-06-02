import React from 'react';
import { Button, Image, Space, Table, Tag } from 'antd';



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
            <>
                {variants.map((variant, index) => (
                    <Tag color="blue" key={index}>
                        {variant.color} - {variant.size}
                    </Tag>
                ))}
            </>
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
                <Button type="primary">Sửa</Button>
                <Button type="primary" danger>Xóa</Button>
            </Space>
        ),
    },
];




//fake dataa
const data = [
    {
        key: '1',
        name: 'Red T-shirt',
        image: 'https://via.placeholder.com/50',
        type: 'Clothing',
        price: 19.99,
        countInStock: 20,
        sold: 5,
        variants: [
            { color: 'Red', size: 'M' },
            { color: 'Red', size: 'L' },
        ],
        description: 'Comfortable and stylish red t-shirt for daily wear.',
    },
    {
        key: '2',
        name: 'Wireless Headphones',
        image: 'https://via.placeholder.com/50',
        type: 'Electronics',
        price: 59.99,
        countInStock: 15,
        sold: 10,
        variants: [
            { color: 'Black', size: 'One Size' },
        ],
        description: 'High-quality wireless headphones with noise cancellation.',
    },
    {
        key: '3',
        name: 'Sneakers',
        image: 'https://via.placeholder.com/50',
        type: 'Footwear',
        price: 89.99,
        countInStock: 8,
        sold: 12,
        variants: [
            { color: 'White', size: '42' },
            { color: 'White', size: '43' },
        ],
        description: 'Durable and comfortable sneakers for all occasions.',
    },
];



const App = () => <Table columns={columns} dataSource={data} />;
export default App;