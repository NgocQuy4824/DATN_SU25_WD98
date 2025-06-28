import React from 'react';
import { useProductsSameSize } from '../../../../hooks/useProductHook';
import { Card, Spin, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const ProductSameSize = ({ sizeId, productId }) => {
  const { data: sameSizeProducts, isLoading } = useProductsSameSize(sizeId, productId);

  if (isLoading) {
    return <Spin />;
  }

  if (!sameSizeProducts || sameSizeProducts.length === 0) {
    return <h2 style={{ color: 'red' }}>Không có sản phẩm cùng kích thước</h2>;
  }

  return (
    <Row gutter={[16, 16]}>
      {sameSizeProducts.map((product) => (
        <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Card
              hoverable
              cover={
                <div style={{ height: '350px', overflow: 'hidden' }}>
                  <img
                    alt={product.name}
                    src={product.variants[0]?.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              }
            >
              <Card.Meta
                title={product.name}
                description={`₫${Math.floor(
                  product.price * (1 - product.discount / 100)
                ).toLocaleString()}`}
              />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default ProductSameSize;
