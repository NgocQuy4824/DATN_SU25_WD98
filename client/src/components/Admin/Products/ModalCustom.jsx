import { Button, Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormComponent from '../../FormComponent/FormComponent';


const ModalCustom = ({ form, open, onCancel, onSubmit, initialValues = [], isEdit, setEditingProduct, isLoading, setActiveStatus }) => {

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleFinish = async (values) => {
  const formData = new FormData();

  // Đưa các field đơn giản vào
  formData.append('name', values.name);
  formData.append('category', values.category);
  formData.append('price', values.price);
  formData.append('discount', values.discount);
  formData.append('description', values.description || '');

  // Biến thể: xử lý ảnh + field
  const variants = values.variants.map((v) => {
  const { image, ...rest } = v;

  // Kiểm tra trước khi thêm ảnh
  if (image?.originFileObj) {
    formData.append('images', image.originFileObj);
  }

  return rest;
});


  formData.append('variants', JSON.stringify(variants));

  // trạng thái hiển thị
  if (isEdit) {
    formData.append('isActive', initialValues?.isActive);
  } else {
    formData.append('isActive', true); // Nếu dùng nút "Lưu & Hiển thị" (nút mặc định submit)
  }

  onSubmit(formData);
  form.resetFields();
  setEditingProduct(null);
};
  const handleSubmitStatus = async (status) => {
  try {
    const values = await form.validateFields();
    const formData = buildFormData(values, status);
    onSubmit(formData);
    form.resetFields();
    setEditingProduct(null);
    onCancel();
  } catch (errorInfo) {
    console.log(errorInfo)
  }
};
const buildFormData = (values, isActive) => {
  const formData = new FormData();

  formData.append('name', values.name);
  formData.append('category', values.category);
  formData.append('price', values.price);
  formData.append('discount', values.discount);
  formData.append('description', values.description || '');

  const variants = values.variants.map((v) => {
    const { image, ...rest } = v;

    if (image?.originFileObj) {
      formData.append('images', image.originFileObj);
    }

    return rest;
  });

  formData.append('variants', JSON.stringify(variants));

  if (typeof isActive === 'boolean') {
    formData.append('isActive', isActive);
  }

  return formData;
};




  return (
    <Modal
      title={isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
      open={open}
      onCancel={() => {
        form.resetFields();
        setEditingProduct(null);
        onCancel();
      }}
      width={600}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{}}>
        <FormComponent />
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button danger onClick={() => {
              form.resetFields();
              setEditingProduct(null);
              onCancel();
            }}>
              Hủy
            </Button>
            {!isEdit && (
              <>
                <Button
                  type="default"
                  onClick={() => handleSubmitStatus(false)} // Lưu ẩn
                  loading={isLoading}
                >
                  Lưu & Ẩn
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleSubmitStatus(true)} // Lưu hiển thị
                  loading={isLoading}
                >
                  Lưu & Hiển thị
                </Button>
              </>
            )}
            {isEdit && (
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Cập nhật
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalCustom