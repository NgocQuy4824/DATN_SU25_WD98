import { Button, DatePicker, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'


const { RangePicker } = DatePicker; 

const FormVoucher = ({form,mode = 'create'}) => {

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          
                <Form.Item
                    label="Mã voucher"
                    name="code"
                    rules={[{ required: true, message: "Vui lòng nhập mã voucher" }]}
                >
                    <Input placeholder="Nhập mã voucher..." />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                >
                    <TextArea placeholder="Nhập mô tả cho voucher..." rows={4} />
                </Form.Item>

                <Form.Item
                    label="Loại giảm giá"
                    name="discountType"
                    rules={[{ required: true, message: "Vui lòng chọn loại giảm giá" }]}
                >
                    <Select placeholder="Chọn loại giảm giá">
                        <Select.Option value="percentage">Phần trăm</Select.Option>
                        <Select.Option value="fixed">Giá trị cố định</Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item
                    label="Giá trị giảm giá"
                    name="discountValue"
                >
                    <Input placeholder="Nhập giá trị giảm giá" type="number" />
                </Form.Item>


                <Form.Item
                    label="Số lượng"
                    name="quantity"
                >
                    <Input placeholder="Nhập số lượng voucher" type="number" />
                </Form.Item>

                <Form.Item
                    label="Ngày áp dụng"
                    name="dateRange"
                    rules={[{ required: true, message: "Vui lòng chọn khoảng thời gian" }]}
                >
                    <RangePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                        placeholder={["Từ ngày", "Đến ngày"]}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block >
                       {mode === 'create' ? 'Tạo voucher' : 'Cập nhật voucher'}
                    </Button>
                </Form.Item>
        </div>
    );
};


export default FormVoucher