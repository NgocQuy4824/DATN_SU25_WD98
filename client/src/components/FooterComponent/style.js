import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #f3f4f6;
  padding: 80px 0 20px;
  font-size: 14px;
  width: 100%;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
`;

export const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-top: 2px solid #000;
  padding-top: 40px;
  gap: 24px;
`;

export const FooterColumn = styled.div`
  flex: 1 220px;
`;

export const FooterTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 16px;
  font-size: 16px;
  color: #111827;
`;

export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FooterItem = styled.li`
  margin-bottom: 10px;
  color: #374151;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    text-decoration: underline;
    color: #2563eb;
  }
`;

export const FooterHighlight = styled.span`
  color: #2563eb;
  font-weight: 600;
`;

export const FooterBottom = styled.div`
  margin-top: 50px;
  text-align: center;
  color: #6b7280;
  line-height: 1.8;
`;

export const SocialList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SocialItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 14px;

  svg {
    color: #2563eb;
  }

  &:hover {
    color: #2563eb;
  }
`;
