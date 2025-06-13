import { Button, Popconfirm, Space, Table } from "antd";
import React from "react";
import { useGetAllCategory } from "../../../hooks/useCategoryHook";
import { useTablePagination } from "../../../hooks/useTablePagination";


const TableCategory = ({
    onEdit,
    onDelete,
    deletingId,
}) => {

    const { data: response = [], isLoading } = useGetAllCategory();
    const category = response?.data ?? []; //xử lý trường hợp response không có data

    const { paginatedData, paginationConfig } = useTablePagination(category, 5);
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
                    <Button type="primary" onClick={() => onEdit(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa danh mục này?"
                        onConfirm={() => onDelete(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true, loading: deletingId === record._id }}
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
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
    );
};

export default TableCategory;
