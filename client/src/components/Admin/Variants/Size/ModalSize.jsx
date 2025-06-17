import { Form, Input, Modal } from 'antd';
import React from 'react'

const ModalSize = ({ open, onCancel, onOk, form, isEdit, loading, onFinish, }) => {
    return (
        <Modal
            open={open}
            title={isEdit ? "Sửa màu sắc" : "Thêm màu sắc"}
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
                    label="Tên màu sắc"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên màu sắc!" }]}
                >
                    <Input placeholder="Nhập tên màu sắc" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalSize