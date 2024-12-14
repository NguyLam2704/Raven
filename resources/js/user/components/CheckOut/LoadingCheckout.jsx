import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const LoadingCheckout = () => {
    const navigate = useNavigate();
        const handleRedirect = () => {
            navigate('/');  // Redirect to a different path
          };
    return(
        <div className="w-full h-screen absolute top-0 z-50 justify-items-center bg-black bg-opacity-25 ">
            <div className="bg-white justify-items-center content-center p-5 border rounded-xl shadow-xl mt-24">
                <div className="flex flex-row content-center align-middle">
                    <div className=" h-5 w-5 mx-3 mt-[6px] rounded-full border-[3px] border-black "></div>                    
                    <FontAwesomeIcon className="h-[28px] absolute pl-[15px] " icon={faCheck} color="white" />
                    <FontAwesomeIcon className="h-[24px] absolute pl-[15px] mt-[3px] " icon={faCheck} />
                    <div className="font-bold mb-5 pt-1">ĐẶT HÀNG THÀNH CÔNG</div>
                </div>
                <div className="text-xl font-extrabold text-[#1E0342]">RAVEN</div>
                <div className="font-medium pb-5">Cảm ơn bạn đã mua hàng</div>
                <div className="font-normal pb-5 text-center">Vui lòng kiểm tra email để xem chi tiết đơn hàng của bạn!</div>
                <button onClick={handleRedirect} className=" font-semibold bg-[#1E0342] text-white px-2 py-[6px] mt-5 rounded-lg">Tiếp tục mua hàng</button>
            </div>
        </div>
    )
}

export default LoadingCheckout