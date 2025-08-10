import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import tw from "twin.macro";

const NavigatonSlider = ({ next, prev, handleAction, ...passProps }) => {
  if (prev) {
    return (
      <div
        onClick={() => handleAction && handleAction()}
        tw="absolute top-1/2 -left-6 z-[1] -translate-y-1/2 cursor-pointer rounded-[2px] bg-black/50 px-3 py-3 duration-300 select-none hover:opacity-80"
        {...passProps}
      >
        <LeftOutlined style={{ color: "#fff", fontSize: 20 }} />
      </div>
    );
  }
  return (
    <div
      onClick={() => handleAction && handleAction()}
      tw="absolute top-1/2 -right-6 z-[1] -translate-y-1/2 cursor-pointer rounded-[2px] bg-black/50 px-3 py-3 duration-300 select-none hover:opacity-80"
      {...passProps}
    >
      <RightOutlined style={{ color: "#fff", fontSize: 20 }} />
    </div>
  );
};

export default NavigatonSlider;
