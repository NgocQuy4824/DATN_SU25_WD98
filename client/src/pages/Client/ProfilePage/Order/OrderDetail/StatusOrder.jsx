import React from "react";
import { Steps } from "antd";
import {
  CameraOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  UserOutlined,
  StarFilled,
} from "@ant-design/icons";

const StatusOrder = ({ currentStatus }) => {
  const steps = [
    { title: "Chờ xác nhận", key: "pending", icon: <CameraOutlined /> },
    { title: "Đã xác nhận", key: "confirmed", icon: <CheckCircleOutlined /> },
    { title: "Đang giao", key: "shipping", icon: <TruckOutlined /> },
    { title: "Đã giao hàng", key: "delivered", icon: <UserOutlined /> },
    { title: "Hoàn thành", key: "done", icon: <StarFilled /> },
  ];
  const currentStep = steps.findIndex((step) => step.key === currentStatus);
  return (
    <Steps current={currentStep}>
      {steps.map((step, index) => (
        <Steps.Step key={index} title={step.title} icon={step.icon} />
      ))}
    </Steps>
  );
};

export default StatusOrder;
