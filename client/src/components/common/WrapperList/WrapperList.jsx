import styled from "styled-components";
import tw from "twin.macro";
import TitleDisplay from "../TitleDisplay";

const OutlineBoxWrapper = styled.div`
  ${tw`m-0 rounded-sm border bg-white px-5 pb-2.5 pt-6 sm:px-7 xl:pb-1`}
`;

const BaseWrapper = styled.div`
  ${tw`my-20 transition-all duration-300 ease-in`}
`;

const BoxWrapper = styled.div`
  ${tw`m-0 rounded-sm border bg-white p-10 sm:px-5`}
`;

const DefaultWrapper = styled.div`
  ${tw``}
`;

const WrapperList = ({
  children,
  hasData = true,
  title,
  className,
  handleClick,
  outline,
  lineButtonBox,
  classic,
  box,
  option,
}) => {
  let WrapperComponent = DefaultWrapper;

  if (outline) {
    WrapperComponent = OutlineBoxWrapper;
  } else if (classic) {
    WrapperComponent = BaseWrapper;
  } else if (box) {
    WrapperComponent = BoxWrapper;
  }

  return (
    <WrapperComponent className={className}>
      <TitleDisplay
        onClick={handleClick}
        border={!lineButtonBox}
        title={title}
        option={option}
      />
      {children}
      {/* {!hasData && <Empty />} */}
    </WrapperComponent>
  );
};

export default WrapperList;
