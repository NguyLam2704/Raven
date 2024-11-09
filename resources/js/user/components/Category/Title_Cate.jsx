import React from 'react';

const Title_Cate = ({cate}) => {
    return(
        <div class="w-full ml-4 h-full mt-11 justify-items-end  ">
            <div class="w-11/12   flex text-center items-center justify-center ">
                <div class="text-nowrap w-fit text-[#a91d3a] text-5xl font-bold font-['Public Sans']">{cate}</div>
                <div class="h-[2px] w-full ml-4 mt-4 bg-[#a91d3a]"></div>
            </div>
        </div>
    )
}


export default Title_Cate