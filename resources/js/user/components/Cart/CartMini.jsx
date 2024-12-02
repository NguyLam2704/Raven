import React, { useEffect, useState } from "react";
import ItemMini from "./ItemMini";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

//Thanh giỏ hàng 
const CartMini = ({handleCart}) => {
    const [storeProduct, setStoreProduct] = useState([]);

    useEffect(() => {
        const savedProduct = localStorage.getItem('cart'); // Lấy product từ localStorage
        if (savedProduct) {
          setStoreProduct(JSON.parse(savedProduct)); // Cập nhật vào state nếu tồn tại
        }
        else {
            console.error("Dữ liệu không phải là mảng:", savedProduct);
          }
      }, []);
      console.log(storeProduct)
    //Hàm xóa sản phẩm
    const removeProduct = (product) =>{
        console.log(product)
        const newCart = storeProduct.filter((item)=> item !== product)        
        localStorage.setItem('cart', JSON.stringify(newCart));
        setStoreProduct(newCart);
    }
    //Hàm tăng số lượng sp
    const handlePlus = (id) =>{
        const index = storeProduct.findIndex((item) => item.proId === id);
        storeProduct[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(storeProduct));
        const savedProduct = localStorage.getItem('cart');
        setStoreProduct(JSON.parse(savedProduct));
    }
    //Hàm giảm số lượng sp
    const handleTru = (id) =>{
        const index = storeProduct.findIndex((item) => item.proId === id);
        if( storeProduct[index].quantity > 1)
        {storeProduct[index].quantity -= 1;}
        localStorage.setItem('cart', JSON.stringify(storeProduct));
        const savedProduct = localStorage.getItem('cart');
        setStoreProduct(JSON.parse(savedProduct));
    }
    
    const naviagte = useNavigate();
    return(
        <div className=" w-full h-screen">
            <div className='h-screen w-full opacity-30 bg-black right-0 absolute top-0 z-50'
                onClick={handleCart} // hàm hiển thị thanh giỏ hàng khi thêm sản phẩm
            >
            </div>
            <div className='h-screen w-1/4 bg-white justify-items-center right-0 absolute top-0 z-50'>
                <div className="  w-11/12 py-4 flex flow-row justify-between items-center ">
                    <div className=" text-[#a91d3a] text-xl font-bold">GIỎ HÀNG</div>
                    <button 
                        onClick={handleCart} //Ẩn thanh giỏ hàng
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>  
                <div className=" h-3/4 w-11/12 overflow-y-auto">
                    {storeProduct.map((product) => (
                        <ItemMini product={product} removeProduct={()=>removeProduct(product)} handlerPlus={()=>handlePlus(product.proId)} handlerTru={()=>handleTru(product.proId)} />                            
                    ))}
                </div>              
                
                <div className=" w-full bg-white  absolute bottom-0 justify-items-center ">
                    {/* Tổng giá tiền các sp trong giỏ hàng */}
                    <div className="w-11/12 flex flex-row justify-between "> 
                        <div className="text-black text-lg font-bold">Tổng tiền:</div>                        
                        <div className="text-[#a91d3a] text-xl font-bold">100000đ</div> 
                    </div>
                    <button 
                        className="w-11/12 flex justify-center bg-[#c73659] rounded-[5px] border border-[#151515] py-1 my-5"
                        onClick={()=>naviagte('/')} // Chuyển đến trang thanh toán
                    >
                        <div className=" text-white text-lg font-bold">THANH TOÁN</div>
                    </button>
                </div>
            </div>
        </div>  
    )
}

export default CartMini