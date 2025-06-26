import React from "react";
import { Row, Col, Typography, Space } from "antd";
import {
  TruckOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const clauses = [
  {
    icon: <TruckOutlined style={{ fontSize: 28, color: "#1890ff" }} />,
    title: "Vận chuyển miễn phí",
    subtitle: "Miễn phí giao hàng đơn từ 500K",
  },
  {
    icon: (
      <SafetyCertificateOutlined style={{ fontSize: 28, color: "#52c41a" }} />
    ),
    title: "Giao dịch bảo mật",
    subtitle: "Bảo vệ thông tin và thanh toán an toàn",
  },
  {
    icon: (
      <CustomerServiceOutlined style={{ fontSize: 28, color: "#faad14" }} />
    ),
    title: "Hỗ trợ khách hàng",
    subtitle: "Phản hồi nhanh 24/7",
  },
  {
    icon: <StarOutlined style={{ fontSize: 28, color: "#eb2f96" }} />,
    title: "Đảm bảo chất lượng",
    subtitle: "Sản phẩm chính hãng, được kiểm định",
  },
];

const ClauseComponent = () => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "40px 0",
        borderTop: "1px solid #f0f0f0",
        textAlign: "center",
      }}
    >
      <Row
        justify="center"
        gutter={[32, 32]}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {clauses.map((item, index) => (
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={6}
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Space align="start" size="middle">
              {item.icon}
              <div style={{ textAlign: "left" }}>
                <Title level={5} style={{ margin: 0 }}>
                  {item.title}
                </Title>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {item.subtitle}
                </Text>
              </div>
            </Space>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ClauseComponent;
