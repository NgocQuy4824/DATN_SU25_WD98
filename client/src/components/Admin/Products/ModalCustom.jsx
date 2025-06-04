import { Button, Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormComponent from '../../FormComponent/FormComponent';


const ModalCustom = ({ form, open, onCancel, onSubmit, initialValues = [], isEdit, setEditingProduct , isLoading }) => {

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalCustom