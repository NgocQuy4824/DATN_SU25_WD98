import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const TitleDisplayContainer = styled.div`
  ${tw`mb-5 mt-4 flex items-center justify-between`}
`;

const TitleContentWrapper = styled.div`
  ${tw`inline-block py-[4px] text-start`}
`;

const TitleInnerSpan = styled.span`
  ${tw`flex items-center gap-3`}
`;

const TitleHeading = styled.span`
  ${tw`text-2xl text-start text-[16px] block font-medium capitalize md:text-[18px]`}
`;

const OptionContainer = styled.div`
  ${tw`flex items-center`}
`;

const TitleDisplay = ({ option, title, border, onClick }) => {
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
      setStatus(!status);
    }
  };

  return (
    <TitleDisplayContainer onClick={handleClick}>
      <TitleContentWrapper>
        <TitleInnerSpan>
          {!status && !!onClick && <MinusOutlined />}
          {status && <PlusOutlined />}
          <TitleHeading>{title}</TitleHeading>
        </TitleInnerSpan>
      </TitleContentWrapper>
      <OptionContainer>{!!option && option}</OptionContainer>
    </TitleDisplayContainer>
  );
};

export default TitleDisplay;
