import { Button, Table } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const data = [
    {
        key: '1',
        codeOrder: 'ORD123456',
        name: 'Alice Johnson',
        totalPrice: 120.5,
        paymentStatus: 'paid',
        orderStatus: 'completed',
        dateCreated: '2025-07-21',
    },
    {
        key: '2',
        codeOrder: 'ORD123457',
        name: 'Bob Smith',
        totalPrice: 89.99,
        paymentStatus: 'unpaid',
        orderStatus: 'pending',
        dateCreated: '2025-07-20',
    },
    {
        key: '3',
        codeOrder: 'ORD123458',
        name: 'Charlie Brown',
        totalPrice: 230.0,
        paymentStatus: 'paid',
        orderStatus: 'completed',
        dateCreated: '2025-07-18',
    },
    {
        key: '4',
        codeOrder: 'ORD123459',
        name: 'Diana Prince',
        totalPrice: 45.75,
        paymentStatus: 'unpaid',
        orderStatus: 'pending',
        dateCreated: '2025-07-17',
    },
];

const TableOrder = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Code Order',
            dataIndex: 'codeOrder',
            key: 'codeOrder',
        },
        {
            title: 'Name User',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => record.name
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
        },
        {
            title: 'Order Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (orderStatus) => {
                const color = orderStatus === 'completed' ? 'green' : 'red';
                const label = orderStatus === 'completed' ? 'Completed' : 'Pending';
                return <span style={{ color, fontWeight: 'bold' }}>{label}</span>;
            },
        },
        {
            title: 'Date Created',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: (_, record) => (
                <span>
                    <Button type='primary' onClick={() => navigate(`/system/admin/orders/detail/${record.codeOrder}`)}>Xem chi tiết</Button>
                </span>
            )
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default TableOrder

