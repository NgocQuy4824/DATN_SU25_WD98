/** @jsxImportSource @emotion/react */
import React from "react";
import tw from "twin.macro";
import { Card } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const InfoCard = ({ icon, label, value, color }) => (
  <Card
    bordered
    className="!shadow-none"
    bodyStyle={{ display: "flex", alignItems: "center", padding: 12 }}
    style={{ borderRadius: 10 }}
  >
    <div css={tw`mr-3 text-xl`} style={{ color }}>
      {icon}
    </div>
    <div css={tw`space-y-0.5`}>
      <p css={tw`text-sm text-gray-500`}>{label}</p>
      <p css={tw`font-semibold text-black`}>{value}</p>
    </div>
  </Card>
);

const Section = ({ title, icon, iconColor, data }) => (
  <div css={tw`bg-white rounded-xl border border-gray-200 p-4 mb-6`}>
    <div css={tw`flex items-center mb-4`}>
      <span css={tw`mr-2 text-xl`} style={{ color: iconColor }}>
        {icon}
      </span>
      <h2 css={tw`text-base font-semibold text-gray-800`}>{title}</h2>
    </div>

    <div css={tw`grid grid-cols-1 md:grid-cols-3 gap-4`}>
      <InfoCard
        icon={<UserOutlined />}
        label={data.nameLabel}
        value={data.name}
        color="#8c8c8c"
      />
      <InfoCard
        icon={<MailOutlined />}
        label="Email"
        value={data.email}
        color="#d4380d"
      />
      <InfoCard
        icon={<PhoneOutlined />}
        label="Số điện thoại"
        value={data.phone}
        color="#389e0d"
      />
    </div>
  </div>
);

const AddressSection = ({ address }) => (
  <div css={tw`bg-white rounded-xl border border-gray-200 p-4`}>
    <div css={tw`flex items-center mb-4`}>
      <span css={tw`mr-2 text-xl text-yellow-600`}>
        <HomeOutlined />
      </span>
      <h2 css={tw`text-base font-semibold text-gray-800`}>Địa chỉ giao hàng</h2>
    </div>

    <Card
      bordered
      className="!shadow-none"
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        padding: 12,
        gap: 15,
      }}
      style={{ borderRadius: 10, backgroundColor: "#f0f5ff" }}
    >
      <div css={tw`pr-3 text-xl text-blue-600`}>
        <EnvironmentOutlined />
      </div>
      <div css={tw`space-y-0.5`}>
        <p css={tw`text-sm text-gray-500`}>Địa chỉ</p>
        <p css={tw`font-semibold text-black`}>{address.title}</p>
      </div>
    </Card>
  </div>
);

const CustomerInfo = ({ customerData, receiverData, addressData }) => {
  return (
    <div>
      <Section
        title="Thông tin khách hàng"
        icon={<UserOutlined />}
        iconColor="#2f54eb"
        data={customerData}
      />
      <Section
        title="Thông tin người nhận"
        icon={<UserOutlined />}
        iconColor="#52c41a"
        data={receiverData}
      />
      <AddressSection address={addressData} />
    </div>
  );
};

export default CustomerInfo;
