import { Form, Input, Modal } from 'antd';
import React from 'react'

const ModalSize = ({ open, onCancel, onOk, form, isEdit, loading, onFinish, }) => {
    return (
        <Modal
            open={open}
            title={isEdit ? "Sửa kích thước" : "Thêm kích thước"}
            onCancel={onCancel}
            onOk={() => {
                form.submit();
            }}
            okText={isEdit ? "Cập nhật" : "Thêm"}
            cancelText="Hủy"
            confirmLoading={loading}

        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Tên kích thước"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên kích thước!" }]}
                >
                    <Input placeholder="Nhập tên kích thước" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalSize