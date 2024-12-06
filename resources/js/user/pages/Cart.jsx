import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ItemProduct from "../components/Cart/ItemProduct";
import { useNavigate } from "react-router-dom";

//Giỏ hàng
const Cart = () => {

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

    const totalCost = storeProduct.reduce((total, item) => {
        return total + (item.cost - (item.cost * item.discount / 100))*item.quantity;
    },0);

    //Xóa sản phẩm
    const removeProduct = (product) =>{
        console.log(product)
        const newCart = storeProduct.filter((item)=> item !== product)        
        localStorage.setItem('cart', JSON.stringify(newCart));
        setStoreProduct(newCart);
    }
    //Hàm tăng số lượng sp
    const handlePlus = (id,color,size) =>{
        const index = storeProduct.findIndex((item) => item.proId === id && item.color === color && item.size === size);
        storeProduct[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(storeProduct));
        const savedProduct = localStorage.getItem('cart');
        setStoreProduct(JSON.parse(savedProduct));
    }
    //Hàm giảm số lượng sp
    const handleTru = (id,color,size) =>{
        const index = storeProduct.findIndex((item) => item.proId === id && item.color === color && item.size === size);
        if( storeProduct[index].quantity > 1)
        {storeProduct[index].quantity -= 1;}
        localStorage.setItem('cart', JSON.stringify(storeProduct));
        const savedProduct = localStorage.getItem('cart');
        setStoreProduct(JSON.parse(savedProduct));
    }
    const navigate = useNavigate()
    return(
        <div className="w-full">
            <Navigation/>
            <div className="w-full justify-items-center pt-24 mt-16 ">
                <div className="text-black text-2xl font-bold uppercase ">Giỏ hàng của bạn</div>
                {
                    storeProduct.length === 0 && (
                        <div className="h-5 mt-10 mb-20 justify-items-center">
                            <div className="text-base">Không có sản phẩm nào trong giỏ hàng!</div>
                            <button onClick={()=>navigate('/')} className="my-5">
                                <div className="text-base">Tiếp tục mua hàng</div>
                            </button>
                        </div>
                    )
                }               
                {   storeProduct.length>0 &&(
                    <div className="w-10/12 flex flex-row border-b-[1px] border-[#C4C4C4] py-2 mt-16">
                        <div className="w-5/12"></div>
                        <div className="w-2/12 text-center text-black text-lg font-bold">Số lượng</div>
                        <div className="w-2/12 text-center text-black text-lg font-bold">Giá tiền</div>
                        <div className="w-2/12 text-center text-black text-lg font-bold">Thành tiền</div>
                    </div>
                )}
                {/* Danh sách các sản phẩm */}
                {storeProduct.map((product, index) => (
                    <ItemProduct key={index} product={product} removeProduct={()=>removeProduct(product)} handlerPlus={()=>handlePlus(product.proId, product.color, product.size)} handlerTru={()=>handleTru(product.proId, product.color, product.size)}/>                            
                ))}
                {/* {
                    <ItemProduct data={ListProduct} />
                } */}
                {/* Tổng giá các sản phẩm trong giỏ được check */}
                {   storeProduct.length>0 &&(
                    <div className="w-10/12 flex flex-row py-2 mt-5">
                        <div className="w-7/12"></div>
                        <div className="w-2/12 text-end text-black text-lg font-bold">Tổng tiền:</div>
                        <div className="w-2/12 text-center text-[#a91d3a] text-xl font-bold">{totalCost.toLocaleString()}đ</div>
                    </div>
                )}
                 {/* Nút thanh toán */}
                {   storeProduct.length>0 &&(
                    <div className="w-10/12 flex flex-row justify-end mt-16 pr-8 ease-in duration-300">
                        <button onClick={() => navigate("/check_out")} className="w-36 h-10 bg-[#c73659] rounded-[5px] border border-[#151515] text-center text-[#eeeeee] text-[17px] font-bold ">Thanh toán</button>
                    </div>
                )}
                
                
            </div>
            <Footer/>
        </div>
    )
}

export default Cart