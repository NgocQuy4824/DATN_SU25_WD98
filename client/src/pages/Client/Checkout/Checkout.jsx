import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import ProductsCheckOutItems from "./_components/ProductsCheckOutItems";
import { Breadcrumb, Card, Table } from "antd";
import { Title } from "./checkOutStyle";
import { Link } from "react-router-dom";

const WrapperLayoutCheckout = styled.div`
  ${tw`grid grid-cols-[2fr,1fr] gap-12 mx-6 mt-8 items-start`}
`;
const WrapperBreadCrumb = styled.div`
  ${tw`mx-6 mt-8`}
`;

const cardStyle = {
  marginBottom: 24,
};

const columnStyle = {
  fontWeight: 500,
};

export default function Checkout() {
  const shippingInfo = useSelector((state) => state.checkout);

  const customer = shippingInfo?.customerInfo || {};
  const receiver = shippingInfo?.receiverInfo?.name
    ? shippingInfo.receiverInfo
    : shippingInfo.customerInfo;
  const address = shippingInfo?.address || {};

  const renderTable = (data) => (
    <Table
      columns={[
        {
          title: "Thông tin",
          dataIndex: "label",
          key: "label",
          width: "30%",
          render: (text) => <div style={columnStyle}>{text}</div>,
        },
        {
          title: "Chi tiết",
          dataIndex: "value",
          key: "value",
        },
      ]}
      dataSource={data}
      pagination={false}
      showHeader={false}
      bordered
    />
  );

  return (
    <>
      <WrapperBreadCrumb>
        <Breadcrumb
          separator=">"
          style={{ marginBottom: 16 }}
          items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: <Link to="/cart">Giỏ hàng</Link> },
            { title: <Link to="/shipping">Địa chỉ giao hàng</Link> },
            { title: "Xác nhận" },
          ]}
        />
      </WrapperBreadCrumb>
      <WrapperLayoutCheckout>
        <Card
          title={
            <div tw="flex items-center justify-between">
              <Title>Xác nhận thông tin đặt hàng</Title>
              <Link to="/shipping">Chỉnh sửa lại thông tin</Link>
            </div>
          }
        >
          <Card title="Người đặt hàng" style={cardStyle}>
            {renderTable([
              { key: "name", label: "Họ tên", value: customer.name },
              { key: "email", label: "Email", value: customer.email },
              { key: "phone", label: "Số điện thoại", value: customer.phone },
            ])}
          </Card>

          {receiver && (
            <Card title="Người nhận hàng" style={cardStyle}>
              {renderTable([
                { key: "name", label: "Họ tên", value: receiver.name },
                { key: "email", label: "Email", value: receiver.email },
                { key: "phone", label: "Số điện thoại", value: receiver.phone },
              ])}
            </Card>
          )}

          <Card title="Địa chỉ nhận hàng" style={cardStyle}>
            {renderTable([
              {
                key: "province",
                label: "Tỉnh/Thành phố",
                value: address.province || "",
              },
              {
                key: "ward",
                label: "Phường/Xã",
                value: address.ward || "",
              },

              {
                key: "district",
                label: "Quận/Huyện",
                value: address.district || "",
              },
              {
                key: "detail",
                label: "Địa chỉ chi tiết",
                value: address.detail || "",
              },
            ])}
          </Card>

          {shippingInfo?.note && (
            <Card title="Ghi chú" style={cardStyle}>
              {renderTable([
                {
                  key: "note",
                  label: "Nội dung",
                  value: shippingInfo.note,
                },
              ])}
            </Card>
          )}
        </Card>

        <ProductsCheckOutItems />
      </WrapperLayoutCheckout>
    </>
  );
}
