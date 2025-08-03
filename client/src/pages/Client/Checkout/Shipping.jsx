import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Select, Form, Input, Breadcrumb, Card, Switch, Tooltip } from "antd";
import {
  useGetDistrict,
  useGetProvince,
  useGetWard,
} from "../../../hooks/useAddressHook";
import ProductsCheckOutItems from "./_components/ProductsCheckOutItems";
import { AddressSelect } from "./_components/SelectAddress";
import { useDispatch, useSelector } from "react-redux";
import { setShippingInfor } from "../../../redux/slides/checkout";
import { Link, useNavigate } from "react-router-dom";
import { SubTitle } from "./checkOutStyle";
import { QuestionCircleOutlined } from "@ant-design/icons";

const WrapperLayoutCheckout = styled.div`
  ${tw`grid grid-cols-[2fr,1fr] gap-12 mx-6 mt-8 items-start`}
`;

const AddressInforWrapper = styled.div`
  ${tw`bg-white py-12 px-24 rounded-lg shadow-lg`}
`;

const Title = styled.h2`
  ${tw`text-2xl font-bold mb-8`}
`;

const WrapperAddressInput = styled.div`
  ${tw`flex flex-row gap-4`}
  & > * {
    ${tw`flex-1`}
  }
`;
const WrapperBreadCrumb = styled.div`
  ${tw`mx-6 mt-8`}
`;

const { TextArea } = Input;

export default function Shipping() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const shippingInfo = useSelector((state) => state.checkout);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // Component State
  const [selectedCity, setSelectedCity] = useState(
    shippingInfo?.address?.provinceId
      ? Number(shippingInfo.address.provinceId)
      : null
  );
  const [selectedWard, setSelectedWard] = useState(
    shippingInfo?.address?.districtId
      ? Number(shippingInfo.address.districtId)
      : null
  );
  const [showReceiverInfo, setShowRreceiverInfo] = useState(
    shippingInfo?.receiverInfo !== shippingInfo?.customerInfo ? true : false
  );
  // Server State
  const { data: provincesData = [] } = useGetProvince();
  const { data: wardsData = [] } = useGetWard(selectedCity);

  const handleCityChange = ({ id }) => {
    setSelectedCity(id);
    form.setFieldsValue({
      address: {
        ward: undefined,
      },
    });
  };

  const handleDistrictChange = ({ id }) => {
    setSelectedWard(id);
  };
  const navigate = useNavigate();
  const onFinish = (value) => {
    const shippingPayload = {
      ...value,
      note: value.note || "",
      address: {
        ...value.address,
        provinceId: selectedCity,
        wardId: selectedWard,
      },
    };
    dispatch(setShippingInfor(shippingPayload));
    navigate("/checkout");
  };
  useEffect(() => {
    console.log(form.getFieldsError());
  }, []);
  return (
    <>
      <WrapperBreadCrumb>
        <Breadcrumb
          separator=">"
          style={{ marginBottom: 16 }}
          items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: <Link to="/">Giỏ hàng</Link> },
            { title: "Địa chỉ giao hàng" },
          ]}
        />
      </WrapperBreadCrumb>

      <WrapperLayoutCheckout>
        <AddressInforWrapper>
          <Title>Thông tin giao hàng</Title>
          <Form
            style={{ marginTop: "15px" }}
            form={form}
            layout="vertical"
            onFinish={(values) => onFinish(values)}
            initialValues={{
              customerInfo: {
                name: user?.name,
                email: user?.email,
                phone: user?.phone,
              },

              address: {
                province: shippingInfo?.address?.province,
                ward: shippingInfo?.address?.ward,
                detail: shippingInfo?.address?.detail,
              },
              note: shippingInfo?.note,
              receiverInfo: {
                name: showReceiverInfo ? shippingInfo?.receiverInfo?.name : "",
                email: showReceiverInfo
                  ? shippingInfo?.receiverInfo?.email
                  : "",
                phone: showReceiverInfo
                  ? shippingInfo?.receiverInfo?.phone
                  : "",
              },
            }}
          >
            <Card>
              <SubTitle>Thông tin người đặt hàng</SubTitle>
              <Form.Item
                style={{ marginTop: "15px" }}
                name={["customerInfo", "name"]}
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input disabled placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item
                name={["customerInfo", "email"]}
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ",
                  },
                ]}
              >
                <Input disabled placeholder="Nhập Email" />
              </Form.Item>
              <Form.Item
                name={["customerInfo", "phone"]}
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input disabled placeholder="Nhập số điện thoại" />
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <SubTitle style={{ margin: "15px 0px" }}>
                  Giao tới người nhận khác{" "}
                  <Tooltip
                    color={"#108ee9"}
                    title={
                      "Thông tin ở trên là thông tin người đặt hàng bạn có thể thay đổi thông tin người nhận hàng ở đây"
                    }
                  >
                    <QuestionCircleOutlined style={{ cursor: "pointer" }} />
                  </Tooltip>
                </SubTitle>
                <Switch
                  defaultChecked={showReceiverInfo}
                  onChange={(e) => setShowRreceiverInfo(e)}
                />
              </div>
              {showReceiverInfo && (
                <>
                  <Form.Item
                    name={["receiverInfo", "name"]}
                    label="Tên người nhận"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên người nhận",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập tên người nhận khác" />
                  </Form.Item>
                  <Form.Item
                    name={["receiverInfo", "email"]}
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email",
                      },
                      {
                        type: "email",
                        message: "Email không hợp lệ",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập email người nhận khác" />
                  </Form.Item>
                  <Form.Item
                    name={["receiverInfo", "phone"]}
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập số điện thoại người nhận khác" />
                  </Form.Item>
                </>
              )}
            </Card>

            <Card style={{ marginTop: "25px" }}>
              <SubTitle>Địa chỉ giao hàng</SubTitle>
              <WrapperAddressInput style={{ marginTop: "15px" }}>
                <AddressSelect
                  name={["address", "province"]}
                  label="Tỉnh/Thành phố"
                  placeholder="Tỉnh/thành phố"
                  options={provincesData}
                  onChange={handleCityChange}
                />
                <AddressSelect
                  name={["address", "ward"]}
                  label="Phường/Xã"
                  placeholder="Chọn phường/xã"
                  onChange={handleDistrictChange}
                  disabled={!selectedCity}
                  options={wardsData}
                />
              </WrapperAddressInput>

              <Form.Item
                name={["address", "detail"]}
                label="Địa chỉ cụ thể"
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ cụ thể" },
                ]}
              >
                <Input placeholder="Nhập địa chỉ cụ thể" />
              </Form.Item>
              <Form.Item name="note" label="Ghi chú đơn hàng (Tuỳ chọn)">
                <TextArea rows={4} />
              </Form.Item>
            </Card>
          </Form>
        </AddressInforWrapper>
        <ProductsCheckOutItems isShippingPage form={form} />
      </WrapperLayoutCheckout>
    </>
  );
}
