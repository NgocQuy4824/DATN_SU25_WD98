import Slider from "react-slick";
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;

  & .slick-arrow.slick-prev {
    left: 12px;
    top: 50%;
    z-index: 10;
    &::before {
      font-size: 40px;
      color: #fff;
    }
  }
  & .slick-arrow.slick-next {
    right: 28px;
    top: 50%;
    z-index: 10;
    &::before {
      font-size: 40px;
      color: #fff;
    }
  }
  & .slick-dots {
    z-index: 10;
    bottom: -2px !important;
    li {
      button {
        &::before {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    li.active {
      button {
        &::before {
          color: #fff;
        }
      }
    }
  }
`;
