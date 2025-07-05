import React from "react";
import { Row, Col, Button } from "antd";
import ProductCart from "../ProductCart/ProductCart";


export default function ProductList({sortedProducts,onResetFilters }) {

  return (
    <>
    <Button style={{margin:"5px 15px"}} type="primary" onClick={onResetFilters}>Đặt lại</Button>
    <Row style={{ margin:"10px 5px" }} gutter={[16, 16]}>
      {sortedProducts.map((product, idx) => (
        <Col xs={24} sm={12} md={8} lg={6} key={idx}>
          <ProductCart product={product} />
        </Col>
      ))}
    </Row>
    </>
  );
}
