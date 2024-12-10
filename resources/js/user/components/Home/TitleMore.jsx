import React from 'react';
import more from "../../assets/more.svg"
import { useNavigate } from 'react-router-dom';

//Tiêu đề và nút xem thêm trong trang Home
const TitleMore = ({type, load, }) => {
    
    const naviagte = useNavigate()
    const hanlderMore = () =>{
        if(type==="SẢN PHẨM MỚI"){
            naviagte('/new_product')
        }
        if(type==="SẢN PHẨM NỔI BẬT"){
            naviagte('/highlight_product')
        }
        if(type==="SALE"){
            naviagte('/sale_product')
        }
    }

    return(
        <div className="w-full h-full ">
            <div className="h-1/5"></div>
            {/* Tiêu đề */}
            <div className=" h-3/5 w-full flex text-center items-center justify-center text-[#a91d3a] desktop:text-5xl ipad:text-4xl mobile:text-2xl font-medium font-Public">{type}</div>
            {/* Nút xem thêm */}
            {load ? (<div></div>):(
                <button onClick={hanlderMore} className="flex h-1/5 justify-end w-full desktop:pr-4 ipad:pr-4 pb-2">
                    <div className="text-[#a91d3a] desktop:text-2xl ipad:text-xl mobile:text-base font-normal underline">Xem thêm</div>
                    <img className="pt-[6px] desktop:h-8 ipad:h-7 mobile:h-5 " src={more} />
                </button>
            )}
        </div>
    )
}
export default TitleMore