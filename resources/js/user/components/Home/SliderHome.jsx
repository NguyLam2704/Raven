import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import slider1 from '../../assets/img_slider_1.svg';
import slider2 from '../../assets/slider2.svg';

const SliderHome = () => {
  const arr_slide = [slider1, slider2]; // Đường dẫn ảnh

  return (
    <div className="w-full relative">
      <Swiper
        
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {arr_slide.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderHome;
