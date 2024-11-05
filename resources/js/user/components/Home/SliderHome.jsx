import React, { useState } from 'react';
import backbtn from '../../assets/Back.svg';
import forwardbtn from '../../assets/Forward.svg';
import slider1 from '../../assets/img_slider_1.svg';
import slider2 from '../../assets/Raven.svg';
import slider3 from '../../assets/img_product.svg';


const SliderHome = () => {
    const arr_slide = [slider1, slider2, slider3];
    const [index,setindex]=useState(0);
  const back = () => { 
    const isFirst = index === 0;
    const newIndex = isFirst ? arr_slide.length - 1 : index -1;
    setindex(newIndex);
  };

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
          <button onClick={back} className="p-1 pr-[6px] bg-white bg-opacity-30 rounded-full">
            <img src={backbtn} alt="Back" />
          </button>
          <button onClick={forward} className="p-1 pr-[6px] bg-white bg-opacity-30 rounded-full">
            <img src={forwardbtn} alt="Forward" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderHome;
