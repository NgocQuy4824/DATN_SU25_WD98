import React from "react";
import { Row, Col, Button, Slider, Typography, Divider } from "antd";
import { useGetAllSizes } from "../../../../hooks/useSizeHook";
import { colorOptions } from "../../../../utils/optionsColor";

const { Text } = Typography;

export default function SidebarFilter({ selectedSize, setSelectedSize, selectedColor, setSelectedColor }) {

  const { data: response = [] } = useGetAllSizes();
  const sizes = response?.data ?? []

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Kích cỡ</Text>
        <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
          {sizes.map((item) => (
            <Col key={item._id}>
              <Button
                type={selectedSize === item._id ? "primary" : "default"}
                onClick={() => setSelectedSize(prev => prev === item._id ? null : item._id)}
              >
                {item.name}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
      <Divider />
      <div style={{ marginBottom: 16 }}>
        <Text strong>Màu sắc</Text>
        <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
          {colorOptions.map((color, idx) => (
            <Col key={idx}>
              <div
                title={color.value}
                onClick={() => setSelectedColor(prev => prev === color.value ? null : color.value)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: color.colorCode,
                  border: selectedColor === color.value ? "2px solid #1890ff" : "1px solid #ccc",
                  cursor: "pointer"
                }}
              ></div>
            </Col>
          ))}
        </Row>
      </div>
      <Divider />
      <div>
        <Text strong>Khoảng giá</Text>
        <Slider range defaultValue={[0, 15000000]} max={15599990} style={{ marginTop: 16 }} />
      </div>
    </>
  );
}
