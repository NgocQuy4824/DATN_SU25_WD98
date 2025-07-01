import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
`;

const Count = styled.div`
  width: 40px;
  text-align: center;
  user-select: none;
`;

const UpdateQuantity = ({ value, min = 1, onChange }) => {
    const handleDecrease = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleIncrease = () => {
        onChange(value + 1);
    };

    return (
        <Wrapper>
            <Button size="small" onClick={handleDecrease} disabled={value <= min}>–</Button>
            <Count>{value}</Count>
            <Button size="small" onClick={handleIncrease}>+</Button>
        </Wrapper>
    );
};

export default UpdateQuantity;
