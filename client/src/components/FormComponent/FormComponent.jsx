import { Button, Form, Input, InputNumber, Select, Space, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { colorOptions } from '../../utils/optionsColor';
import { useCategoryOptions } from '../../hooks/useCategoryOptions';
import { useSizeOptions } from '../../hooks/useSizeOptions';
import { validateDuplicateVariant, validateVariants } from '../../utils/validateDuplicateSize';

const FormComponent = () => {

  const { options: categoryOptions, isLoading: loadingCategories } = useCategoryOptions();
  const { options: sizeOptions, isLoading: loadingSize } = useSizeOptions();


  return (
    <>
      <Form.Item
        name="name"
        label="Tên Sản Phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="category"
        label="Loại Sản Phẩm"
        rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
      >
        <Select options={categoryOptions} loading={loadingCategories} />
      </Form.Item>

      <Form.Item
        name="price"
        label="Giá"
        rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="discount"
        label="Giảm giá (%)"
        rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm giá' }]}
      >
        <InputNumber min={0} max={100} style={{ width: '100%' }} />
      </Form.Item>

      <Form.List name="variants" rules={[{ validator: validateVariants }]}>
        {(fields, { add, remove }, { errors }) => (
          <>
            <label><b>Biến thể</b></label>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">

                {/* Ảnh */}
               <Form.Item
        {...restField}
        name={[name, 'image']}
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (!e || !e.fileList) return [];
          return e.fileList;
        }}
        rules={[{ required: true, message: 'Vui lòng chọn ảnh biến thể' }]}
      >
        <Upload
          listType="picture-card"
          maxCount={1}
          accept="image/*"
          beforeUpload={() => false}
          showUploadList={{ showPreviewIcon: true }}
          onPreview={(file) => {
            const src = file.url || (file.response && file.response.url);
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            if (imgWindow) {
              imgWindow.document.write(image.outerHTML);
            }
          }}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
</Form.Item>




                {/* Màu */}
                <Form.Item
                  {...restField}
                  name={[name, 'color']}
                  rules={[{ required: true, message: 'Vui lòng chọn màu sắc' }]}
                >
                  <Select placeholder="Chọn màu" options={colorOptions} style={{ width: 150 }} />
                </Form.Item>

                {/* Kích thước */}
                <Form.Item
                  {...restField}
                  name={[name, 'size']}
                  rules={[
                    { required: true, message: 'Vui lòng chọn kích thước' },
                    ({ getFieldValue }) => ({
                      validator: validateDuplicateVariant(getFieldValue, index),
                    }),
                  ]}
                >
                  <Select
                    placeholder="Chọn kích thước"
                    options={sizeOptions}
                    loading={loadingSize}
                    style={{ width: 150 }}
                  />
                </Form.Item>

                {/* Tồn kho */}
                <Form.Item
                  {...restField}
                  name={[name, 'countInStock']}
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho' }]}
                >
                  <InputNumber placeholder="Số lượng kho" min={0} style={{ width: 120 }} />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Thêm Biến Thể
              </Button>
            </Form.Item>

            <div style={{ color: '#ff4d4f' }}>
              <Form.ErrorList errors={errors} />
            </div>
          </>
        )}
      </Form.List>
      <Form.Item name="description" label="Mô Tả">
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
}

export default FormComponent