import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import { ORDER_STATUS } from "../../constants/order";

const OrderStatusTag = ({ status }) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return (
        <Tag icon={<ClockCircleOutlined />} color="default">
          Chờ xác nhận
        </Tag>
      );
    case ORDER_STATUS.CONFIRMED:
      return <Tag color="processing">Đã xác nhận</Tag>;
    case ORDER_STATUS.CANCELLED:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Đã hủy
        </Tag>
      );
    case ORDER_STATUS.SHIPPING:
      return (
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
          Đang giao
        </Tag>
      );
    case ORDER_STATUS.DELIVERED:
      return (
        <Tag icon={<ExclamationCircleOutlined />} color="purple">
          Đã giao
        </Tag>
      );
    case ORDER_STATUS.DONE:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Hoàn thành
        </Tag>
      );
    default:
      return (
        <Tag icon={<MinusCircleOutlined />} color="default">
          Có lỗi!!!
        </Tag>
      );
  }
};

export default OrderStatusTag;
