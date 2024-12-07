import React from "react";

//Tiêu đề trong trang Tiềm kiếm
const TitleSearch = ({input}) => {
    return(
        <div className=" mt-[120px] border-b-2 border-[#d9d9d9] justify-items-center mx-7">
           <div className="text-center text-black desktop:text-4xl ipad:text-3xl font-bold font-['Public Sans']">Tìm kiếm</div>
           <div className=" flex mt-2 mb-4 text-black desktop:text-2xl ipad:text-xl font-normal font-['Public Sans']">Kết quả tìm kiếm cho "<div className="font-bold">{input}</div><div>"</div></div>
        </div>
    )
}

export default TitleSearch;