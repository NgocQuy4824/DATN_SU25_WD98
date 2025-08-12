import { Button, Popconfirm, Space, Table } from 'antd';
import React from 'react'
import { useTablePagination } from '../../../hooks/useTablePagination';
import { discountTypeMap } from '../../../utils/voucherTypeMap';
import { useDeleteVoucher } from '../../../hooks/useVoucherHook';

const TableVoucher = ({ vouchers, loading, onEdit }) => {

    const { paginatedData, paginationConfig } = useTablePagination(vouchers, 5);

    const { mutate: deleteVoucherMutate } = useDeleteVoucher();

    const handleDelete = (id) => {
        deleteVoucherMutate(id);
    };

    const columns = [
        {
            title: 'Mã Voucher',
            key: 'code',
            render: (_, record) => <>{record.code}</>
        },
        {
            title: 'Loại Voucher',
            key: 'discountType',
            render: (text) => discountTypeMap[text.discountType],
        },
        {
            title: 'Giảm Giá',
            key: 'discountValue',
            render: (_, record) => `${record.discountValue}`,
        },
        {
            title: 'Ngày Bắt Đầu',
            key: 'startDate',
            render: (_, record) => (
                <>{new Date(record.startDate).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })}</>
            )
        },
        {
            title: 'Ngày Kết Thúc',
            key: 'endDate',
            render: (_, record) => (
                <>{new Date(record.endDate).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })}</>
            )
        },

        {
            title: 'Trạng Thái',
            key: 'status',
            render: (_, record) => {
                return <>{record.status}</>;
            }
        },
        {
            title: 'Số Lượng',
            key: 'quantity',
            render: (_, record) => {
                return <>{record.quantity}</>;
            }
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => onEdit(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa voucher không?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="danger">Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },

    ]
    return (
        <Table
            columns={columns}
            dataSource={paginatedData}
            pagination={paginationConfig}
            rowKey="_id"
            loading={loading}
        />
    )
}

export default TableVoucher