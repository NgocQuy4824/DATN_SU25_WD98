import { ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import tw from "twin.macro";

const DropdownItemWrapper = styled.div`
  ${tw`my-1.5`}
`;

const StyledInteractiveElement = styled.div`
  ${tw`my-3 flex items-center justify-between gap-x-7`}
`;

const DropDownItem = ({
  handleClick,
  title,
  labelId,
  onMouseEnter,
  onMouseLeave,
}) => {
  const commonProps = {
    onClick: handleClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
  };

  if (labelId) {
    return (
      <DropdownItemWrapper>
        <StyledInteractiveElement as="label" htmlFor={labelId} {...commonProps}>
          <span>{title}</span> <ArrowRightOutlined />
        </StyledInteractiveElement>
      </DropdownItemWrapper>
    );
  }

  return (
    <DropdownItemWrapper>
      <StyledInteractiveElement as="span" {...commonProps}>
        <span>{title}</span> <ArrowRightOutlined />
      </StyledInteractiveElement>
    </DropdownItemWrapper>
  );
};

export default DropDownItem;
