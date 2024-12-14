import React, { useState } from 'react';
import backbtn from '../../assets/Back.svg';
import forwardbtn from '../../assets/Forward.svg';
import slider1 from '../../assets/banner2.jpg';
import slider2 from '../../assets/banner1.webp';
import slider3 from '../../assets/slider3.webp';
import slider4 from '../../assets/banner3.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

//Slider trong trang chủ
const SliderHome = () => {
  const arr_slide = [slider1, slider3, slider4, slider2,];//danh sách các ảnh trong slider
  const [index,setindex]=useState(0);

  //hàm chuyển đến ảnh slider trước đó
  const back = () => { 
    const isFirst = index === 0;
    const newIndex = isFirst ? arr_slide.length - 1 : index -1;
    setindex(newIndex);
  };
  //hàm chuyển đến ảnh slider tiếp theo
  const forward = () => {
    const isLast = index === arr_slide.length - 1;
    const newIndex = isLast ? 0 : index +1;
    setindex(newIndex);
  };

  return (
       <div className="w-full bg-center object-cover duration-500 mt-[80px]">
        <Swiper
          slidesPerView={1}
          loop={true}          
          onAutoplay={500}
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
