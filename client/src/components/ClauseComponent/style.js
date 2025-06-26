import { styled } from "styled-components";

export const FeatureWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  flex-wrap: wrap;
  gap: 24px;
`;

export const FeatureItem = styled.div`
  flex: 1;
  min-width: 100px;
  text-align: center;
`;

export const IconWrapper = styled.div`
  font-size: 28px;
  color: #d63031;
  margin-bottom: 8px;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const Subtitle = styled.div`
  font-size: 14px;
  color: #888;
`;
