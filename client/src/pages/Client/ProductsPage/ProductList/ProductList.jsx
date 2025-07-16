import React from "react";
import { Row, Col, Button, Select } from "antd";
import ProductCart from "../ProductCart/ProductCart";
import { CheckOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function ProductList({ products, sortOption, setSortOption, onResetFilters }) {

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "priceHighToLow") {
      return b.price - a.price;
    } else if (sortOption === "priceLowToHigh") {
      return a.price - b.price;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
        <Button
          style={{ margin: "5px 15px" }}
          type="primary"
          onClick={onResetFilters}
        >
          Đặt lại
        </Button>
        <Select
          value={sortOption}
          onChange={value => setSortOption(value)}
          style={{ width: 150, marginBottom: 16, marginLeft: 15, marginRight: "15px" }}
          dropdownMatchSelectWidth={false}
        >
          <Option value="newprice" style={{ width: 150 }}>
            {sortOption === "newprice" && <CheckOutlined style={{ marginRight: 8 }} />}
            Mới nhất
          </Option>
          <Option value="priceHighToLow" style={{ width: 150 }}>
            {sortOption === "priceHighToLow" && <CheckOutlined style={{ marginRight: 8 }} />}
            Giá: từ cao đến thấp
          </Option>
          <Option value="priceLowToHigh" style={{ width: 150 }}>
            {sortOption === "priceLowToHigh" && <CheckOutlined style={{ marginRight: 8 }} />}
            Giá: từ thấp đến cao
          </Option>
        </Select>
      </div>

      <Row style={{ margin: "10px 5px" }} gutter={[16, 16]}>
        {sortedProducts
          .filter((p) => p.isActive)
          .map((product, idx) => (
            <Col xs={24} sm={12} md={8} lg={6} key={idx}>
              <ProductCart product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
}
