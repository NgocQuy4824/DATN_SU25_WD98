import { PageContainer } from '@ant-design/pro-components'
import { Button, Form } from 'antd'
import React from 'react'
import TableSize from './TableSize'
import { useCreateSize, useGetAllSizes, useUpdateSize } from '../../../../hooks/useSizeHook'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import ModalSize from './ModalSize'

const Size = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSize, setEditingSize] = useState(null);
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const { data: response = [], isLoading } = useGetAllSizes();
    const size = response?.data ?? [];

    const { mutate: createSize, isLoading: creating } = useCreateSize(() => {
        form.resetFields();
        setModalOpen(false);
        setEditingSize(null);
        queryClient.invalidateQueries(['sizes']);
    });

    const { mutate: updateSize, isLoading: updating } = useUpdateSize(() => {
        form.resetFields();
        setModalOpen(false);
        setEditingSize(null);
        queryClient.invalidateQueries(['sizes']);
    });

    const openAddModal = () => {
        setEditingSize(null);
        form.resetFields();
        setModalOpen(true);
    };

    const openEditModal = (size) => {
        setEditingSize(size);
        form.setFieldsValue(size);
        setModalOpen(true);
    };

    const handleSubmit = (values) => {
        if (editingSize) {
            updateSize({ id: editingSize._id, updatedData: values });
        } else {
            createSize(values);
        }
        setModalOpen(false);
        setEditingSize(null);
    };

    const handleCancel = () => {
        setEditingSize(null);
        form.resetFields();
        setModalOpen(false);
    };

    return (
        <PageContainer title="Quản lý danh mục">
            <Button type="primary" onClick={openAddModal}>
                Thêm màu sắc
            </Button>
            <div style={{ marginTop: 20 }}>
                <TableSize size={size} isLoading={isLoading} onEdit={openEditModal} />
            </div>

            <ModalSize
                form={form}
                open={modalOpen}
                onCancel={handleCancel}
                onOk={handleSubmit}
                initialValues={editingSize || {}}
                isEdit={!!editingSize}
                isLoading={editingSize ? updating : creating}
                onFinish={handleSubmit}
            />
        </PageContainer>
    )
}

export default Size