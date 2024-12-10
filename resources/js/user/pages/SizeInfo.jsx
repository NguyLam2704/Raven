import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import size from '../assets/size.png'

//Hướng dẫn chọn size
const SizeInfo = () => {
    return(
        <div className="w-full font-Public">
            <Navigation/>
            <div className="w-full justify-items-center mt-[90px] ">
                <div className="w-8/12 text-center desktop:text-5xl ipad:text-4xl text-[#a91d3a] font-bold py-10">RAVEN</div>
                <div className="w-full justify-items-center">
                <img className="desktop:w-8/12 ipad:w-9/12 mobile:w-11/12" src={size} alt="size" />   
                </div>                
            </div>
            <Footer/>
        </div>
    )
}

export default SizeInfo