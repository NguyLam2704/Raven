import React, { useState } from 'react';
import slider1 from '../../assets/banner2.jpg';
import slider2 from '../../assets/banner1.webp';
import slider3 from '../../assets/slider3.webp';
import slider4 from '../../assets/banner3.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Correct import for Autoplay module
import 'swiper/swiper-bundle.css'; // Import core Swiper CSS

// Slider trong trang chủ
const SliderHome = () => {
  const arr_slide = [slider1, slider3, slider4, slider2]; // danh sách các ảnh trong slider

  return (
    <div className="w-full bg-center object-cover duration-500 mt-[80px]">
      <Swiper
        modules={[Autoplay]} // Register the Autoplay module
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Configure autoplay
        className=""
      >
        {arr_slide.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              className=""
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderHome;
