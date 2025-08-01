import styled from "styled-components";
import tw from "twin.macro";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Tooltip, Avatar, Progress } from "antd";
import dayjs from "dayjs";
import { Currency } from "../../../../../utils/index";

const HeaderTitle = styled.span`
  ${tw`text-base font-semibold`}
`;

const CenteredDiv = styled.div`
  ${tw`text-center`}
`;

const BlueTextCentered = styled.div`
  ${tw`text-center font-semibold text-[#0068c9]`}
`;

const CustomerInfoContainer = styled.div`
  ${tw`flex items-center gap-2`}
`;

const CustomerTextContainer = styled.div`
  ${tw`flex flex-col`}
`;

const CustomerName = styled.span`
  ${tw`text-base font-semibold`}
`;

const CustomerContact = styled.span`
  ${tw`text-sm text-[#64748b]`}
`;

const OrderCountValue = styled.div`
  ${tw`text-lg font-semibold text-[#0068c9]`}
`;

const UnitText = styled.div`
  ${tw`text-xs text-[#64748b]`}
`;

const SpentValue = styled.div`
  ${tw`text-lg font-semibold text-[#3c50e0]`}
`;

const ItemCountValue = styled.div`
  ${tw`text-lg font-semibold text-[#722ed1]`}
`;

const DateText = styled.div`
  ${tw`text-base font-semibold`}
`;

const TimeText = styled.div`
  ${tw`text-xs text-[#64748b]`}
`;

// --- Columns Definition ---

export const columns = [
  {
    title: <HeaderTitle>#</HeaderTitle>,
    dataIndex: "index",
    key: "index",
    align: "center",
    width: "5%",
    render: (_, __, index) => <BlueTextCentered>{index + 1}</BlueTextCentered>,
  },
  {
    title: <HeaderTitle>Khách hàng</HeaderTitle>,
    dataIndex: "name",
    key: "name",
    width: "30%",
    render: (_, buyer) => (
      <CustomerInfoContainer>
        <Avatar
          size={48}
          src={buyer.avatar}
          icon={!buyer.avatar && <UserOutlined />}
          css={tw`mr-3`} // Using css prop for twin.macro on Ant Design component
        />
        <CustomerTextContainer>
          <CustomerName>{buyer.name}</CustomerName>
          <CustomerContact>{buyer.email}</CustomerContact>
          <CustomerContact>{buyer.phone}</CustomerContact>
        </CustomerTextContainer>
      </CustomerInfoContainer>
    ),
  },
  {
    title: (
      <Tooltip title="Số lượng đơn hàng mà khách hàng đã mua" color="blue">
        <HeaderTitle>
          Đơn hàng <QuestionCircleOutlined />
        </HeaderTitle>
      </Tooltip>
    ),
    dataIndex: "totalOrders",
    key: "totalOrders",
    align: "center",
    width: "15%",
    render: (totalOrders) => (
      <CenteredDiv>
        <OrderCountValue>{totalOrders}</OrderCountValue>
        <UnitText>đơn</UnitText>
      </CenteredDiv>
    ),
  },
  {
    title: (
      <Tooltip title="Tổng số tiền khách hàng đã bỏ ra" color="blue">
        <HeaderTitle>
          Đã chi <QuestionCircleOutlined />
        </HeaderTitle>
      </Tooltip>
    ),
    dataIndex: "totalSpent",
    key: "totalSpent",
    align: "center",
    width: "20%",
    render: (totalSpent) => (
      <CenteredDiv>
        <SpentValue>{Currency.format(totalSpent)}</SpentValue>
        <Progress
          percent={Math.round((totalSpent / 100000000) * 100)}
          showInfo={false}
          strokeColor="#3c50e0"
          trailColor="#e6f7ff"
        />
      </CenteredDiv>
    ),
  },
  {
    title: (
      <Tooltip title="Tổng số sản phẩm khách hàng đã mua" color="blue">
        <HeaderTitle>
          Sản phẩm <QuestionCircleOutlined />
        </HeaderTitle>
        ,
      </Tooltip>
    ),
    dataIndex: "totalItems",
    key: "totalItems",
    align: "center",
    width: "15%",
    render: (totalItems) => (
      <CenteredDiv>
        <ItemCountValue>{totalItems}</ItemCountValue>
        <UnitText>sản phẩm</UnitText>
      </CenteredDiv>
    ),
  },
  {
    title: <HeaderTitle>Đặt lần cuối</HeaderTitle>,
    dataIndex: "lastOrderDate",
    key: "lastOrderDate",
    align: "center",
    width: "15%",
    render: (date) => (
      <CenteredDiv>
        <DateText>{dayjs(date).format("DD/MM/YYYY")}</DateText>
        <TimeText>{dayjs(date).format("HH:mm")}</TimeText>
      </CenteredDiv>
    ),
  },
];

export const generateUniqueId = (prefix) =>
  `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
