import { Button, Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormComponent from '../../FormComponent/FormComponent';


const ModalCustom = ({
  form,
  open,
  onCancel,
  onSubmit,
  initialValues = [],
  isEdit,
  setEditingProduct,
  isLoading,
  setActiveStatus,
}) => {
  useEffect(() => {
    if (open && initialValues) {
      const formattedInitialValues = { ...initialValues };

      if (Array.isArray(initialValues.variants)) {
        formattedInitialValues.variants = initialValues.variants.map((variant, index) => {
          let formattedImage = [];

          if (typeof variant.image === 'string') {
            formattedImage = [
              {
                uid: `-variant-${index}`,
                name: `image-${index}`,
                status: 'done',
                url: variant.image, // dùng luôn Cloudinary URL
                type: 'image/jpeg',
              },
            ];
          }

          return {
            ...variant,
            image: formattedImage,
          };
        });
      }

      form.setFieldsValue(formattedInitialValues);
    }
  }, [open, initialValues, form]);

  const handleFinish = async (values) => {
    const formData = buildFormData(values, isEdit ? initialValues?.isActive : true);
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
      console.log(errorInfo);
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

      if (Array.isArray(image)) {
        const fileObj = image[0];

        if (fileObj?.originFileObj) {
          // Ảnh mới (từ Upload)
          formData.append('images', fileObj.originFileObj);
        } else if (fileObj?.url) {
          // Ảnh cũ (đã là URL Cloudinary)
          rest.image = fileObj.url;
        }
      }

      return rest;
    });

    formData.append('variants', JSON.stringify(variants));
    formData.append('isActive', isActive);

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
            <Button
              danger
              onClick={() => {
                form.resetFields();
                setEditingProduct(null);
                onCancel();
              }}
            >
              Hủy
            </Button>
            {!isEdit && (
              <>
                <Button type="default" onClick={() => handleSubmitStatus(false)} loading={isLoading}>
                  Lưu & Ẩn
                </Button>
                <Button type="primary" onClick={() => handleSubmitStatus(true)} loading={isLoading}>
                  Lưu & Hiển thị
                </Button>
              </>
            )}
            {isEdit && (
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Cập nhật
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCustom;