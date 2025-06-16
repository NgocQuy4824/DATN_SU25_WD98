import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { colorOptions } from '../../utils/optionsColor';

const FormComponent = () => {

    const validateVariants = (_, variants) =>
        variants && variants.length > 0
            ? Promise.resolve()
            : Promise.reject(new Error('Vui lòng thêm ít nhất một biến thể'));

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
                name="type"
                label="Loại Sản Phẩm"
                rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm' }]}
            >
                <Input />
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
                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                                key={key}
                                style={{ display: 'flex', marginBottom: 8 }}
                                align="baseline"
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'image']}
                                    rules={[{ required: true, message: 'Vui lòng nhập URL ảnh biến thể' }]}
                                >
                                    <Input placeholder="Ảnh biến thể" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'color']}
                                    rules={[{ required: true, message: 'Vui lòng chọn màu sắc' }]}
                                >
                                    <Select
                                        placeholder="Chọn màu"
                                        options={colorOptions}
                                        style={{ width: 150 }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'size']}
                                    rules={[{ required: true, message: 'Vui lòng nhập kích thước' }]}
                                >
                                    <Input placeholder="Kích thước" />
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    name={[name, 'countInStock']}
                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho' }]}
                                >
                                    <InputNumber placeholder='Số lượng kho' min={0} style={{ width: 120 }} />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                            >
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