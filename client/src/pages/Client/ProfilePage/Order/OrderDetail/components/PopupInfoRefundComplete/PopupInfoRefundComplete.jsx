import { Modal, Row, Col, Image, Descriptions, Tag } from "antd";
import React, { useState } from "react";
import tw from 'twin.macro'
const PopupInfoRefundComplete = ({ children, refundInfo }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  console.log(refundInfo);
  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children, { onClick: handleOpen })
        : children}
      <Modal
        title="Thông tin hoàn tiền"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        footer={null}
      >
        <Row gutter={16}>
          <Col>
            <div
              style={{
                width: 200,
                height: 350,
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#000",
              }}
            >
              <Image
                src={refundInfo?.imageConfirm}
                alt="Ảnh hoàn tiền"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>
          <Col flex="auto">
            <Descriptions title="Chi tiết hoàn tiền" bordered column={1}>
              <Descriptions.Item label="Ngân hàng">
                <img
                  src={refundInfo?.bankLogo}
                  alt=""
                  style={{ width: 24, marginRight: 8 }}
                />
                {refundInfo?.bankName}
              </Descriptions.Item>
              <Descriptions.Item label="Số tài khoản">
                {refundInfo?.accountNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Chủ tài khoản">
                {refundInfo?.accountName}
              </Descriptions.Item>
              <Descriptions.Item label="Số tiền">
                {refundInfo?.amount?.toLocaleString()} đ
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {refundInfo?.isCompleted ? (
                  <Tag color="green">Đã hoàn tất</Tag>
                ) : (
                  "Chưa xử lý"
                )}
              </Descriptions.Item>
            </Descriptions>
            <p tw="mt-4 ml-2 text-red-500">
            * Lưu ý nếu có thắc mắc hoặc chưa nhận được tiền vui lòng liên hệ:{" "}
            {refundInfo?.reportInfo}
          </p>
          </Col>

        </Row>
      </Modal>
    </>
  );
};

export default PopupInfoRefundComplete;
