import React from "react";
import { Card, Typography, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function ProductCart({ product }) {
  const navigate = useNavigate();

  //Nếu có variants và có ít nhất 1 phần tử → lấy phần tử đầu tiên
  const variant =
    product.variants && product.variants.length > 0
      ? product.variants[0]
      : null;

  return (
    <Card
      onClick={() =>
        navigate(`/products/${product._id}`, {
          state: { from: "product-page" },
        })
      }
      hoverable
      cover={
        <img
          alt={product.name}
          src={variant?.image}
          style={{ width: "100%", height: 300, objectFit: "cover" }}
        />
      }
    >
      <Text strong>{product.name}</Text>

      <div>
        {product.discount && <Text type="danger">{product.discount}%</Text>}
      </div>

      <div>
        <Text style={{ color: "red" }}>{product.price.toLocaleString()} đ</Text>
        {/* Nếu có oldPrice thì hiển thị */}
        {product.oldPrice && (
          <>
            {" "}
            <Text delete type="secondary">
              {product.oldPrice.toLocaleString()} đ
            </Text>
          </>
        )}
      </div>

      <div style={{ marginTop: 8 }}>
        {product.discount ? (
          <Button size="small" danger>
            Giá độc quyền Online
          </Button>
        ) : (
          <Tag color="red">Hàng chính Hãng</Tag>
        )}
      </div>
    </Card>
  );
}
