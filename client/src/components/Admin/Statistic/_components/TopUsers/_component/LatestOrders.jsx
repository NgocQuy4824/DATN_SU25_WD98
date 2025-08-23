import { Card, Flex, Typography, Avatar, Tooltip, Button } from "antd";
import {
  CreditCardOutlined,
  DollarOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Currency } from "../../../../../../utils/index";
import OrderStatusTag from "../../../../../OrderStatusTag/OrderStatusTag";

const { Text } = Typography;

const OrdersContainer = styled(Flex)`
  ${tw`my-4`}
`;

const StyledCard = styled(Card)`
  ${tw`w-1/2  duration-300`}
`;

const CustomerInfoFlex = styled(Flex)`
  ${tw`w-2/5 gap-2`}
`;

const CustomerAvatar = styled(Avatar)`
  ${tw`mr-3`}
`;

const CustomerNameText = styled(Text)`
  ${tw`text-lg`}
`;

const OrderDetailsFlex = styled(Flex)`
  ${tw`w-3/5`}
`;

const LatestOrders = ({ orders }) => {
  const navigate = useNavigate();

  const handleViewDetails = (orderId) => {
    navigate(`/admin/orders/${orderId}/detail`);
  };

  return (
    <OrdersContainer gap={16}>
      {orders.slice(0, 2).map((order) => (
        <StyledCard key={order._id}>
          <Flex align="center" justify="space-between">
            <CustomerInfoFlex align="center">
              <CustomerAvatar
                src={order.customerAvatar}
                icon={!order.customerAvatar && <UserOutlined />}
                size={48}
              />

              <Flex vertical>
                <CustomerNameText strong>{order.customerName}</CustomerNameText>

                <Text type="secondary">
                  {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")}
                </Text>
              </Flex>
            </CustomerInfoFlex>

            <OrderDetailsFlex align="center" justify="space-between">
              <Tooltip
                title={
                  order.paymentMethod === "cash"
                    ? "Thanh toán tiền mặt"
                    : "Thanh toán thẻ"
                }
              >
                {order.paymentMethod === "cash" ? (
                  <DollarOutlined style={{ fontSize: 24, color: "#3c50e0" }} />
                ) : (
                  <CreditCardOutlined
                    style={{ fontSize: 24, color: "#3c50e0" }}
                  />
                )}
              </Tooltip>

              <CustomerNameText strong>
                {Currency.format(order.totalPrice)}
              </CustomerNameText>

              <OrderStatusTag status={order.status} />

              {/* <Tooltip title="Xem chi tiết">
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  shape="circle"
                  onClick={() => handleViewDetails(order._id)}
                />
              </Tooltip> */}
            </OrderDetailsFlex>
          </Flex>
        </StyledCard>
      ))}
    </OrdersContainer>
  );
};

export default LatestOrders;
