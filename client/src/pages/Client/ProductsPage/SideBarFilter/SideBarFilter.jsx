import React from "react";
import { Row, Col, Button, Slider, Typography, Divider, Select } from "antd";
import { useGetAllSizes } from "../../../../hooks/useSizeHook";
import { colorOptions } from "../../../../utils/optionsColor";
import { useCategoryOptions } from "../../../../hooks/useCategoryOptions";
const { Option } = Select;
const { Text } = Typography;

export default function SidebarFilter({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  selectedCategory,
  setSelectedCategory,
}) {
  const { data: response = [] } = useGetAllSizes();
  const sizes = response?.data ?? [];

  const { options: categoryOptions } = useCategoryOptions();

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Danh mục</Text>
        <Select
          allowClear
          style={{ width: "100%", marginTop: 8 }}
          placeholder="Chọn danh mục"
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
        >
          {categoryOptions.map((cat) => (
            <Option key={cat.value} value={cat.value}>
              {cat.label}
            </Option>
          ))}
        </Select>
      </div>
      <Divider />

      <div style={{ marginBottom: 16 }}>
        <Text strong>Kích cỡ</Text>
        <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
          {sizes.map((item) => (
            <Col key={item._id}>
              <Button
                type={selectedSize === item._id ? "primary" : "default"}
                onClick={() =>
                  setSelectedSize((prev) =>
                    prev === item._id ? null : item._id
                  )
                }
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
                onClick={() =>
                  setSelectedColor((prev) =>
                    prev === color.value ? null : color.value
                  )
                }
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: color.colorCode,
                  border:
                    selectedColor === color.value
                      ? "2px solid #1890ff"
                      : "1px solid #ccc",
                  cursor: "pointer",
                }}
              ></div>
            </Col>
          ))}
        </Row>
      </div>
      <Divider />
      <div>
        <Text strong>Khoảng giá</Text>
        <Slider
          range
          defaultValue={[0, 15000000]}
          max={15599990}
          style={{ marginTop: 16 }}
        />
      </div>
    </>
  );
}
