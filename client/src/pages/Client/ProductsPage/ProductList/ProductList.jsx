import React from "react";
import { Row, Col } from "antd";
import ProductCart from "../ProductCart/ProductCart";


export default function ProductList({products }) {

  return (
    <Row gutter={[16, 16]}>
      {products.map((product, idx) => (
        <Col xs={24} sm={12} md={8} lg={6} key={idx}>
          <ProductCart product={product} />
        </Col>
      ))}
    </Row>
  );
}
