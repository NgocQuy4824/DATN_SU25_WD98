import { Button, Form, Input, Modal, Popconfirm, Space, Table } from "antd";
import React, { useState } from "react";
import {
  useDeleteCategory,
  useGetAllCategory,
  useUpdateCategory,
} from "../../../hooks/useCategoryHook";

const TableCategory = () => {
  const { data: response = [], isLoading } = useGetAllCategory();
  const { mutate: deleteCategory, isLoading: isDeleting } = useDeleteCategory();
  const { mutate: updateCategory, isLoading: isUpdating } = useUpdateCategory();
  const category = response?.data ?? [];

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDelete = (id) => {
    deleteCategory(id);
  };

  const handleEdit = (record) => {
    setSelectedCategory(record);
    form.setFieldsValue({ name: record.name });
    setOpen(true);
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      updateCategory({
        id: selectedCategory._id,
        updatedData: values,
      });
      setOpen(false);
    });
  };

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
        <Space style={{ display: "flex" }}>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa danh mục này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true, loading: isDeleting }}
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={category}
        isLoading={isLoading}
      />
      <Modal
        open={open}
        title="Sửa danh mục"
        onCancel={() => setOpen(false)}
        onOk={handleUpdate}
        okText="Cập nhật"
        cancelText="Hủy"
        confirmLoading={isUpdating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableCategory;
