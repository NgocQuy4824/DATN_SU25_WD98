import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Select, Form, Input, Breadcrumb } from "antd";
import {
  useGetDistrict,
  useGetProvince,
  useGetWard,
} from "../../../hooks/useAddressHook";
import ProductsCheckOutItems from "./_components/ProductsCheckOutItems";
import { AddressSelect } from "./_components/SelectAddress";
import { useDispatch } from "react-redux";
import { setShippingInfor } from "../../../redux/slides/checkout";
import { Link } from "react-router-dom";

const WrapperLayoutCheckout = styled.div`
  ${tw`grid grid-cols-[2fr,1fr] gap-12 mx-6 mt-8`}
`;

const AddressInforWrapper = styled.div`
  ${tw`bg-white py-6 px-24 rounded-lg shadow-lg`}
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

export default function Shipping() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // Component State
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  // Server State
  const { data: provincesData = [] } = useGetProvince();
  const { data: districtsData = [] } = useGetDistrict(selectedCity);
  const { data: wardsData = [] } = useGetWard(selectedDistrict);

  const handleCityChange = ({ id }) => {
    setSelectedCity(id);
    setSelectedDistrict(null);
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const handleDistrictChange = ({ id }) => {
    setSelectedDistrict(id);
    form.setFieldsValue({ ward: undefined });
  };
  const onFinish = (value) => {
    const shippingPayload = {
      customerInfo: {
        name: value.name,
        phone: value.phone,
        email: value.email,
      },
      address: {
        province: value.province,
        district: value.district,
        ward: value.ward,
      },
    };
    dispatch(setShippingInfor(shippingPayload));
  };
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
          >
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Vui lòng nhập Email" }]}
            >
              <Input placeholder="Nhập Email" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <WrapperAddressInput>
              <AddressSelect
                name="province"
                label="Tỉnh/Thành phố"
                placeholder="Tỉnh/thành phố"
                options={provincesData}
                onChange={handleCityChange}
              />
              <AddressSelect
                name="district"
                label="Quận/Huyện"
                placeholder="Chọn quận/huyện"
                options={districtsData}
                disabled={!selectedCity}
                onChange={handleDistrictChange}
              />
              <AddressSelect
                name="ward"
                label="Phường/Xã"
                placeholder="Chọn phường/xã"
                options={wardsData}
                disabled={!selectedDistrict}
              />
            </WrapperAddressInput>

            <Form.Item
              name="detail"
              label="Địa chỉ cụ thể"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ cụ thể" },
              ]}
            >
              <Input placeholder="Nhập địa chỉ cụ thể" />
            </Form.Item>
          </Form>
        </AddressInforWrapper>
        <ProductsCheckOutItems isShippingPage form={form} />
      </WrapperLayoutCheckout>
    </>
  );
}
