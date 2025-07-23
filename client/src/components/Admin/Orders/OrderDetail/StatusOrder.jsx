import React from 'react';
import { Steps } from 'antd';
import {
  CameraOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  UserOutlined,
  StarFilled,
} from '@ant-design/icons';

const StatusOrder = ({ currentStep = 3 }) => {
  const steps = [
    { title: 'Chờ xác nhận', icon: <CameraOutlined /> },
    { title: 'Đã xác nhận', icon: <CheckCircleOutlined /> },
    { title: 'Đang giao', icon: <TruckOutlined /> },
    { title: 'Đã giao hàng', icon: <UserOutlined /> },
    { title: 'Hoàn thành', icon: <StarFilled /> },
  ];

  return (
    <Steps current={currentStep}>
      {steps.map((step, index) => (
        <Steps.Step key={index} title={step.title} icon={step.icon} />
      ))}
    </Steps>
  );
};

export default StatusOrder;
