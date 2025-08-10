import React from "react";
import styled from "styled-components";
import { Button, InputNumber } from "antd";
import tw from 'twin.macro'
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  gap: 10px;
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
     <div style={{border: '1px solid #7777'}} tw="flex items-center gap-3 bg-white py-1.5 rounded-xl">
       <Button
        size="small"
        onClick={handleDecrease}
        disabled={value <= min}
        loading={loading}
        style={{
          width: 30,
          height: 30,
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        –
      </Button>
      <div className="custom-input-number">
        <InputNumber
          value={value}
          min={min}
          max={max}
          onChange={(val) => {
            if (typeof val === "number") onChange(val);
          }}
          size="small"
          style={{ width: 40, backgroundColor: "transparent", border: "none" }}
          disabled={loading}
        />
      </div>

      <Button
        size="small"
        onClick={handleIncrease}
        disabled={max !== undefined && value >= max}
        loading={loading}
        style={{
          width: 30,
          height: 30,
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        +
      </Button>
     </div>
    </Wrapper>
  );
};

export default UpdateQuantity;
