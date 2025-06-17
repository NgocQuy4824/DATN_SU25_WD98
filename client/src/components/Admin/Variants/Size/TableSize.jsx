import { Button, Space, Table } from 'antd';
import React from 'react'
import { useTablePagination } from '../../../../hooks/useTablePagination';

const TableSize = ({ size, isLoading, onEdit }) => {


    const { paginatedData, paginationConfig } = useTablePagination(size, 5);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => onEdit(record)} >
                        Sửa
                    </Button>
                </Space>
            ),
        },
    ];


    return (
        <Table
            rowKey="_id"
            columns={columns}
            dataSource={paginatedData}
            loading={isLoading}
            pagination={paginationConfig}
        />
    )
}

export default TableSize