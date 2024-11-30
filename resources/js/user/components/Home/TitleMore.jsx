import React from 'react';
import more from "../../assets/more.svg"

//Tiêu đề và nút xem thêm trong trang Home
const TitleMore = ({type, load}) => {
    return(
        <div className="w-full h-full ">
            <div className="h-1/5"></div>
            {/* Tiêu đề */}
            <div className=" h-3/5 w-full flex text-center items-center justify-center text-[#a91d3a] text-6xl font-semibold font-['Public Sans'] ">{type}</div>
            {/* Nút xem thêm */}
            {load ? (<div></div>):(
                <div className="flex h-1/5 justify-end w-full pr-4 pb-2">
                    <div className="text-[#a91d3a] text-2xl font-normal underline">Xem thêm</div>
                    <img className="pt-2" src={more} />
                </div>
            )}
        </div>
    )
}
export default TitleMore