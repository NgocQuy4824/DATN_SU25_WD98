import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useChangePassword } from "../../../hooks/useUsersHook";

const ChangePasswordModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const changePasswordMutation = useChangePassword();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("✅ Form values:", values);

      changePasswordMutation.mutate(values, {
        onSuccess: () => {
          form.resetFields();
          onClose();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Đổi mật khẩu"
      open={visible}  
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        form={form}
        layout="vertical"
        name="change_password_form"
      >
        <Form.Item
          name="password"
          label="Mật khẩu hiện tại"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu hiện tại" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>

        <Button
          type="primary"
          block
          loading={changePasswordMutation.isLoading}
          onClick={handleOk}
        >
          Đổi mật khẩu
        </Button>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
