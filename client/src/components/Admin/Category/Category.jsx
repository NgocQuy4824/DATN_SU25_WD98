import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Button, Form } from 'antd';
import TableCategory from './TableCategory';
import ModalCategory from './ModalCategory';
import {
  useGetAllCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCreateCategory
} from '../../../hooks/useCategoryHook';
import { useQueryClient } from '@tanstack/react-query';

const Category = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [categoryList, setCategoryList] = useState([]);

 
  useGetAllCategory((data) => {
    setCategoryList(data);
  });

const { mutate: createCategory, isLoading: creating } = useCreateCategory(() => {
  form.resetFields();
  setModalOpen(false);
  setEditingCategory(null);
  queryClient.invalidateQueries(['typeproducts']);
});

  const { mutate: updateCategory, isLoading: updating } = useUpdateCategory(() => {
    form.resetFields();
    setModalOpen(false);
    setEditingCategory(null);
    queryClient.invalidateQueries(['typeproducts']);
  });

  const { mutate: deleteCategory, isLoading: deleting } = useDeleteCategory();

  const handleDelete = (id) => {
    deleteCategory(id);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (editingCategory) {
      updateCategory({ id: editingCategory._id, updatedData: values });
    } else {
      createCategory(values);
    }
    setModalOpen(false);
    setEditingCategory(null);
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingCategory(null);
    setModalOpen(false);
  };

  return (
    <PageContainer title="Quản lý danh mục">
      <Button type="primary" onClick={openAddModal}>
        Thêm danh mục
      </Button>

      <div style={{ marginTop: 20 }}>
        <TableCategory
          category={categoryList}
          onEdit={openEditModal}
          onDelete={handleDelete}
          loading={deleting}
        />
      </div>

      <ModalCategory
        form={form}
        open={modalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        initialValues={editingCategory || {}}
        isEdit={!!editingCategory}
        isLoading={editingCategory ? updating : creating}
        onFinish={handleSubmit}
      />
    </PageContainer>
  );
};

export default Category;
