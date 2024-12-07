import React from 'react';

//Tiêu đề các mục sản phẩm
const TitleCategory = ({cate}) => {
    return(
        <div className="w-full ml-4 h-full mt-16 justify-items-end font-Public ">
            <div className="w-11/12   flex text-center items-center justify-center ">
                {/* Tiêu đề */}
                <div className="text-nowrap w-fit text-[#a91d3a] desktop:text-5xl ipad:text-4xl font-bold">{cate}</div>
                {/* Line */}
                <div className="h-[2px] w-full ml-4 desktop:mt-4 ipad:mt-2 bg-[#a91d3a]"></div>
            </div>
        </div>
    )
}

export default TitleCategory