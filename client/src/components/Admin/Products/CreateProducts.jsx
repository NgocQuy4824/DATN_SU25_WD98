import React, { useState } from 'react'
import ModalCustom from './ModalCustom';
import FormComponent from '../../FormComponent/FormComponent';
import { useCreateProduct } from '../../../hooks/useCreateProduct';
import { Form } from 'antd';

const CreateProducts = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { mutate: createProduct, isLoading } = useCreateProduct(() => {
    setIsModalOpen(false);
    form.resetFields();
  });

  const handleCreate = (formData) => {
    createProduct(formData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <ModalCustom
      form={form}
      open={isModalOpen}
      onCancel={handleCancel}
      onSubmit={handleCreate}
      isEdit={false}
      initialValues={{ variants: [] }}
      setEditingProduct={() => {}}
      isLoading={isLoading}
    />
  );
};

export default CreateProducts;
