import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React from "react";

const ButtonInputSearch = () => {
  return (
    <Space.Compact>
      <Input placeholder="Tìm kiếm" style={{ width: 150, height: 22 }} />
      <Button
        icon={<SearchOutlined />}
        type="primary"
        style={{
          padding: "0 8px",
          height: 22,
          fontSize: 12,
        }}
      />
    </Space.Compact>
  );
};

export default ButtonInputSearch;
