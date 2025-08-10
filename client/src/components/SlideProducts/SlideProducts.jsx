import { Spin } from "antd";
import { useCallback, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NavigatonSlider from "./elements/NavigationSlider";
import tw from "twin.macro";
import ProductCard from "../../pages/Client/HomePage/ProductCard";

const ProductWrapper = ({ title, data, isPending, description }) => {
  const swiperRef = useRef(null);

  const nextSlide = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);

  const prevSlide = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  }, []);

  const marginClass = description ? "mt-8" : "my-8";

  return (
    <div tw="mt-12">
      <div>
        {data ? (
          !isPending ? (
            <div tw="relative">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, A11y]}
                spaceBetween={8}
                slidesPerView={4}
                loop
                navigation={false}
                keyboard={{ enabled: true, onlyInViewport: false }}
              >
                {Array.isArray(data) &&
                  data.map((item, index) => (
                    <SwiperSlide key={index}>
                      <ProductCard product={item} />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <NavigatonSlider prev handleAction={prevSlide} />
              <NavigatonSlider next handleAction={nextSlide} />
            </div>
          ) : (
            <div tw="flex min-h-[30vh] items-center justify-center">
              <Spin />
            </div>
          )
        ) : (
          <div tw="flex min-h-[30vh] items-center justify-center">
            <h3>Không có sản phẩm</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductWrapper;
