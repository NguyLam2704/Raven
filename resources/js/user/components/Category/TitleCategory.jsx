import React from 'react';

//Tiêu đề các mục sản phẩm
const TitleCategory = ({cate}) => {
    return(
        <div className="w-full ml-4 h-full mt-16 justify-items-end font-Public ">
            <div className="w-11/12   flex text-center items-center justify-center ">
                {/* Tiêu đề */}
                <div className="text-nowrap w-fit text-[#1E0342] desktop:text-5xl ipad:text-4xl mobile:text-3xl font-bold">{cate}</div>
                {/* Line */}
                <div className="h-[2px] w-full ml-4 desktop:mt-4 ipad:mt-2 bg-[#1E0342]"></div>
            </div>
        </div>
    )
}

export default TitleCategory