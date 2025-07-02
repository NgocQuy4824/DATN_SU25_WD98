import React from "react";
import styled from "styled-components";
import { Button, InputNumber } from "antd";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
`;

const UpdateQuantity = ({ value, min = 1, max, onChange, loading }) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (!max || value < max) {
      onChange(value + 1);
    }
  };

  return (
    <Wrapper>
      <Button
        size="small"
        onClick={handleDecrease}
        disabled={value <= min}
        loading={loading}
      >
        –
      </Button>
      <InputNumber
        value={value}
        min={min}
        max={max}
        onChange={(val) => {
          if (typeof val === 'number') onChange(val);
        }}
        size="small"
        style={{ width: 60, border: 'none', textAlign: 'center' }}
        disabled={loading}
      />
      <Button
        size="small"
        onClick={handleIncrease}
        disabled={max !== undefined && value >= max}
        loading={loading}
      >
        +
      </Button>
    </Wrapper>
  );
};

export default UpdateQuantity;
