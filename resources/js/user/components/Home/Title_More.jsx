import React from 'react';
import Cart from "../../assets/more.svg"

const Title = ({type}) => {
    return(
        <div class="w-full h-full ">
            <div class="h-1/5"></div>
            <div class=" h-3/5 w-full flex text-center items-center justify-center text-[#a91d3a] text-6xl font-semibold font-['Public Sans'] ">{type}</div>
            <div class="flex h-1/5 justify-end w-full pr-4 pb-2">
                    <div class="text-[#a91d3a] text-2xl font-normal underline">Xem thêm</div>
                <img class="pt-2" src={Cart} />
            </div>
        </div>
    )
}
export default Title