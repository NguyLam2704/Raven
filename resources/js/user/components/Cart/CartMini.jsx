import React from "react";
import ItemMini from "./ItemMini";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

//Thanh giỏ hàng 
const CartMini = ({handleCart}) => {
    const naviagte = useNavigate()
    return(
        <div>
            <div className='h-screen w-full opacity-40 bg-black right-0 absolute top-0 z-50'
                onClick={handleCart} // hàm hiển thị thanh giỏ hàng khi thêm sản phẩm
            >
            </div>
            <div className='h-screen w-1/4 bg-white justify-items-center right-0 absolute top-0 z-50'>
                <div className="w-11/12 py-5 flex flow-row justify-between items-center ">
                    <div className=" text-[#a91d3a] text-xl font-bold">GIỎ HÀNG</div>
                    <button 
                        onClick={handleCart} //Ẩn thanh giỏ hàng
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>                
                <ItemMini/>
                <div className="w-full absolute bottom-0 justify-items-center ">
                    {/* Tổng giá tiền các sp trong giỏ hàng */}
                    <div className="w-11/12 flex flex-row justify-between"> 
                        <div className="text-black text-lg font-bold">Tổng tiền:</div>                        
                        <div className="text-[#a91d3a] text-xl font-bold">100000đ</div> 
                    </div>
                    <button 
                        className="w-11/12 flex justify-center bg-[#c73659] rounded-[5px] border border-[#151515] py-1 my-7"
                        onClick={()=>naviagte('/cart')} // Chuyển đến trang thanh toán
                    >
                        <div className=" text-white text-lg font-bold">THANH TOÁN</div>
                    </button>
                </div>
            </div>
        </div>  
    )
}

export default CartMini