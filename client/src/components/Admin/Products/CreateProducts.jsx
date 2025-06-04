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

  const handleCreate = (values) => {
    createProduct(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  return (
    <ModalCustom
      title="Thêm sản phẩm mới"
      isModalOpen={isModalOpen}
      onCancel={handleCancel}
      handleCancel={() => setIsModalOpen(false)}
      destroyOnClose={true}
    >
      <FormComponent onFinish={handleCreate} isLoading={isLoading} />
    </ModalCustom>
  )
}

export default CreateProducts