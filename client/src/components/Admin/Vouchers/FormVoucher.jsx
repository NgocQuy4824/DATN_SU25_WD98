import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const { RangePicker } = DatePicker;

const validateCode = [
  { required: true, message: "Vui lòng nhập mã voucher" },
  { min: 5, message: "Mã voucher phải ít nhất 5 ký tự" },
];

const discountValueRules = ({ getFieldValue }) => [
  { required: true, message: "Vui lòng nhập giá trị giảm giá" },
  {
    validator(_, value) {
      const type = getFieldValue("discountType");
      if (!value && value !== 0) {
        return Promise.resolve();
      }
      const numValue = Number(value);
      if (type === "percentage" && (numValue < 1 || numValue > 100)) {
        return Promise.reject("Phần trăm giảm giá phải từ 1 đến 100");
      }
      if (type === "fixed" && (numValue < 1000 || numValue > 100000)) {
        return Promise.reject("Giá trị cố định phải từ 1,000 đến 100,000");
      }
      return Promise.resolve();
    },
  },
];

const validateNumber = [
  { required: true, message: "Vui lòng nhập số lượng" },
  {
    validator(_, value) {
      if (value < 0) {
        return Promise.reject("Số lượng không được âm");
      }
      return Promise.resolve();
    },
  },
];

const FormVoucher = ({ form, mode = "create" }) => {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 20,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Form.Item label="Mã voucher" name="code" rules={validateCode}>
        <Input placeholder="Nhập mã voucher..." />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <TextArea placeholder="Nhập mô tả cho voucher..." rows={4} />
      </Form.Item>

      <Form.Item
        label="Loại giảm giá"
        name="discountType"
        rules={[{ required: true, message: "Vui lòng chọn loại giảm giá" }]}
      >
        <Select placeholder="Chọn loại giảm giá">
          {/* <Select.Option value="percentage">Phần trăm</Select.Option> */}
          <Select.Option value="fixed">Giá trị cố định</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Giá trị giảm giá"
        name="discountValue"
        rules={discountValueRules({ getFieldValue: form.getFieldValue })}
      >
        <Input placeholder="Nhập giá trị giảm giá" type="number" />
      </Form.Item>

      <Form.Item label="Số lượng" name="quantity" rules={validateNumber}>
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
        <Button type="primary" htmlType="submit" block>
          {mode === "create" ? "Tạo voucher" : "Cập nhật voucher"}
        </Button>
      </Form.Item>
    </div>
  );
};

export default FormVoucher;
