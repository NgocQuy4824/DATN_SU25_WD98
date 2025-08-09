import {
    CheckCircleOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";
import { Steps } from "antd";

const RefundStatus = ({ currentStatus }) => {
    console.log(currentStatus)
  const steps = [
    { title: "Chờ hoàn tiền", key: "pendingCancelled", icon: <ClockCircleOutlined /> },
    { title: "Đã hoàn tiền", key: "refund", icon: <CheckCircleOutlined /> },
  ];
  const currentStep = steps.findIndex((step) => step.key === currentStatus);
  console.log(currentStep)
  return (
    <Steps  current={currentStep}>
      {steps.map((step, index) => (
        <Steps.Step status={index === currentStep ? "error" : undefined} key={index} title={step.title} icon={step.icon} />
      ))}
    </Steps>
  );
};

export default RefundStatus;
