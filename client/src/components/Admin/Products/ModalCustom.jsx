import { Button, Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormComponent from '../../FormComponent/FormComponent';


const ModalCustom = ({ form, open, onCancel, onSubmit, initialValues = [], isEdit, setEditingProduct, isLoading, setActiveStatus }) => {

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleFinish = (values) => {
    // Mặc định khi cập nhật thì không chọn Lưu ẩn/hiển thị, nên giữ nguyên trạng thái cũ
    const productData = isEdit
      ? { ...values, isActive: initialValues?.isActive }
      : values;

    onSubmit(productData);
    form.resetFields();
    setEditingProduct(null);
  };

  const handleSubmitStatus = async (status) => {
    try {
      const values = await form.validateFields();
      const productData = { ...values, isActive: status };
      onSubmit(productData);
      form.resetFields();
      setEditingProduct(null);
      onCancel();
    } catch (errorInfo) {
      console.log(errorInfo)
    }
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