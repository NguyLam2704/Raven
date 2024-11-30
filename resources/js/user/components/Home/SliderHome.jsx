import React, { useState } from 'react';
import backbtn from '../../assets/Back.svg';
import forwardbtn from '../../assets/Forward.svg';
import slider1 from '../../assets/img_slider_1.svg';
import slider2 from '../../assets/slider2.svg';

//Slider trong trang chủ
const SliderHome = () => {
  const arr_slide = [slider1,  slider2];//danh sách các ảnh trong slider
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
    <div className='w-full h-[520px] relative'>
      <div style={{ backgroundImage: `url(${arr_slide[index]})` }} className='w-full h-full bg-center bg-cover duration-500'>
      </div>
      <div className="absolute flex h-full w-full top-0 left-0">
        <div className="my-auto w-full flex justify-between">
          <button  className="p-1 bg-white hover:opacity-70 bg-opacity-30 rounded-full"
                  onClick={back} //chuyển đến ảnh slider trước đó
          >
            <img src={backbtn} alt="Back" />
          </button>
          <button className="p-1 bg-white hover:opacity-70 bg-opacity-30 rounded-full"
                   onClick={forward} //chuyển đến ảnh slider tiếp theo
          >
            <img src={forwardbtn} alt="Forward" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderHome;
