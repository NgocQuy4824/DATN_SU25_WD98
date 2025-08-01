import { Watermark, Card, Button } from "antd";
import styled from "styled-components";
import tw from "twin.macro";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const WrapperOrderSuccess = styled.div`
  ${tw`h-screen  flex justify-center items-center `}
`;

const StyledCard = styled(Card)`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <Watermark zIndex={-1} content={["PACERUN", "Cảm ơn vì đã đặt hàng"]}>
      <WrapperOrderSuccess>
        <StyledCard>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 48 }} />
          <h2 style={{ marginTop: 16 }}>Đặt hàng thành công!</h2>
          <p>Cảm ơn bạn đã tin tưởng và đặt hàng tại PACERUN.</p>
          <Button
            type="primary"
            style={{ marginTop: 24 }}
            onClick={() => (window.location.href = "/")}
          >
            Quay về trang chủ
          </Button>
          <Button
            type="default"
            style={{ marginTop: 16, marginLeft: 8 }} 
            onClick={() => (window.location.href = "/profile/orders")}
          >
            Xem đơn hàng của bạn
          </Button>
        </StyledCard>
      </WrapperOrderSuccess>
    </Watermark>
  );
}
