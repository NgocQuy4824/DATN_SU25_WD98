import { Form, Input, Modal } from "antd";
import React from "react";

const ModalCategory = ({ open, onCancel, onOk, form, loading, onFinish }) => {
    return (
        <Modal
            open={open}
            title="Sửa danh mục"
            onCancel={onCancel}
            onOk={() => {
                form.submit();
            }}
            okText="Cập nhật"
            cancelText="Hủy"
            confirmLoading={loading}

        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Tên danh mục"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
                >
                    <Input placeholder="Nhập tên danh mục" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCategory;
