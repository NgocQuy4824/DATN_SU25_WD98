import { Button, Radio } from "antd";

import styled from "styled-components";
import { Typography } from "antd";
const { Paragraph } = Typography;

export const Wrapper = styled.div`
  max-width: 1250px;
  margin: 24px auto;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  background-color: #fafafa;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;

export const ImageWrapper = styled.div`
  width: 400px;
`;

export const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
`;

export const Thumbnails = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
`;

export const ThumbnailImage = styled.img`
  width: calc((100% - 16px) / 3);
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  &:hover {
    border: 2px solid #1890ff;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PriceSection = styled.div`
  padding: 12px 16px;
  display: inline-block;
`;

export const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: red;
`;

export const OldPrice = styled.span`
  font-size: 16px;
  color: #888;
  text-decoration: line-through;
  margin-left: 12px;
`;

export const Discount = styled.span`
  font-size: 18px;
  color: red;
  margin-left: 12px;
`;

export const OptionGroup = styled.div`
  margin-top: 5px;
`;

export const StyledRadioButton = styled(Radio.Button)`
  padding: 6px 6px;
  font-size: 14px;
  min-width: 45px;
  min-heigth: 45px
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RadioGroupWrapper = styled(Radio.Group)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

export const QuantityWrapper = styled.div`
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;

  & button {
    width: 32px;
    height: 32px;
    border: none;
    background: rgb(224, 222, 222);
    font-size: 18px;
    cursor: pointer;
  }

  & span {
    width: 40px;
    text-align: center;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

export const BuyButton = styled(Button)`
  background-color: red !important;
  border-color: red !important;
  color: #fff !important;
`;

export const DescriptionWrapper = styled.div`
  margin-top: 24px;
  position: relative;
`;

export const ClampedParagraph = styled(Paragraph)`
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "none" : 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ToggleButton = styled.div`
  color: #1890ff;
  cursor: pointer;
  margin-top: 8px;
  user-select: none;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: calc((100% - 16px) / 3); /* cùng kích thước với ThumbnailImage */
  height: 100px;

  &:hover .add-to-cart-btn {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AddToCartButton = styled.button`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translate(-50%, 10px);
  opacity: 0;
  transition: all 0.3s ease;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #0958d9;
  }
`;
