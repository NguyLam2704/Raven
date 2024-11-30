import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import size from '../assets/size.png'

//Hướng dẫn chọn size
const SizeInfo = () => {
    return(
        <div className="w-full">
            <Navigation/>
            <div className="w-full justify-items-center mt-[90px] ">
                <div className="w-8/12 text-center text-5xl text-[#a91d3a] font-bold py-10">RAVEN</div>
                <div className="w-full justify-items-center">
                <img className="w-8/12" src={size} alt="size" />   
                </div>                
            </div>
            <Footer/>
        </div>
    )
}

export default SizeInfo