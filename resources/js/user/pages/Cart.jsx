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
    
    //Danh sách sp được chọn
    const [cartProduct, setCartProduct] = useState([])  
    const handleCheckChange = (product, checked, quan) => {
        if (checked && quan) {
            setCartProduct((prev) => [...prev, product]); // Thêm vào `cartProduct`
        } else {
            setCartProduct((prev) => prev.filter((item) => item.proId !== product.proId ||  
                                                            item.color !== product.color ||
                                                            item.size !== product.size )); // Xóa khỏi `cartProduct`
        }
    };
    //console.log(cartProduct)
    const totalCost = cartProduct.reduce((total, item) => {
        return total + (item.cost - (item.cost * item.discount / 100))*item.quantity;
    },0);

    //Xóa sản phẩm
    const removeProduct = (product) =>{
        const newCart = storeProduct.filter((item)=> item !== product)        
        localStorage.setItem('cart', JSON.stringify(newCart));
        setStoreProduct(newCart);
        setCartProduct((prev) => prev.filter((item) => item.proId !== product.proId ||  
                                                            item.color !== product.color ||
                                                            item.size !== product.size )); 
    }
    //Hàm tăng số lượng sp
    const handlePlus = (product) =>{
        const index = storeProduct.findIndex((item) => item === product );
        storeProduct[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(storeProduct));
        const savedProduct = localStorage.getItem('cart');
        setStoreProduct(JSON.parse(savedProduct));
        const id = cartProduct.findIndex((item) => item.proId === product.proId &&  
                                                    item.color === product.color &&
                                                    item.size === product.size );
        cartProduct[id].quantity += 1;
    }
    //Hàm giảm số lượng sp
    const handleTru = (product) =>{
        const index = storeProduct.findIndex((item) => item === product);
        if( storeProduct[index].quantity > 1)
        {storeProduct[index].quantity -= 1;}
        localStorage.setItem('cart', JSON.stringify(storeProduct));
        const savedProduct = localStorage.getItem('cart');
        setStoreProduct(JSON.parse(savedProduct));
        const id = cartProduct.findIndex((item) => item.proId === product.proId &&  
                                                    item.color === product.color &&
                                                    item.size === product.size );
        if( cartProduct[id].quantity > 1)
            {cartProduct[id].quantity -= 1;}
    }
    const navigate = useNavigate()
    return(
        <div className="w-full font-Public bg-white">
            <Navigation/>
            <div className="w-full justify-items-center pt-24 mt-16 ">
                <div className="text-black desktop:text-2xl ipad:text-xl mobile:text-lg font-bold uppercase ">Giỏ hàng của bạn</div>
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
                    <div className="desktop:w-10/12 ipad:w-10/12  mobile:w-11/12 flex flex-row border-b-[1px] desktop:text-lg ipad:text-base mobile:text-xs border-[#C4C4C4] py-2 mt-16">
                        <div className="desktop:w-5/12 ipad:w-5/12 mobile:w-7/12"></div>
                        <div className="w-2/12 text-center text-black font-bold">Số lượng</div>
                        <div className="w-2/12 text-center text-black font-bold">Giá tiền</div>
                        <div className="w-2/12 desktop:flex ipad:flex mobile:hidden justify-center text-center text-black font-bold">Thành tiền</div>
                    </div>
                )}
                {/* Danh sách các sản phẩm */}
                {storeProduct.map((product, index) => (
                    <ItemProduct key={index} products={product} removeProduct={()=>removeProduct(product)} handlerPlus={()=>handlePlus(product)} handlerTru={()=>handleTru(product )} onCheckChange={handleCheckChange}/>                            
                ))}
                
                {/* {
                    <ItemProduct data={ListProduct} />
                } */}
                {/* Tổng giá các sản phẩm trong giỏ được check */}
                {   storeProduct.length>0 &&(
                    <div className="desktop:w-10/12 ipad:w-10/12 mobile:w-11/12 flex flex-row py-2 mt-5">
                        <div className="desktop:w-7/12 ipad:w-7/12 mobile:w-7/12"></div>
                        <div className="w-2/12  text-black desktop:text-lg ipad:text-base mobile:text-sm text-center content-center font-bold">Tổng tiền:</div>
                        <div className="w-2/12 text-center text-[#a91d3a] desktop:text-xl ipad:text-lg mobile:text-sm content-center font-bold">{totalCost.toLocaleString('vi-VN')}đ</div>
                    </div>
                )}
                 {/* Nút thanh toán */}
                {   storeProduct.length>0 &&(
                    <div className="desktop:w-10/12 ipad:w-10/12 mobile:w-11/12 flex flex-row justify-end mt-16 desktop:pr-8 ipad:pr-7 mobile:pr-6 ease-in duration-300">
                        <button className="desktop:w-36 ipad:w-32 mobile:w-28 desktop:h-10 ipad:h-9 mobile:h-8 bg-[#1E0342] rounded-[5px] border border-[#151515] text-center text-[#eeeeee] desktop:text-base ipad:text-sm mobile:text-xs font-bold "
                            onClick={() => navigate("/check_out", { state: { product: cartProduct} })} 
                            disabled={!cartProduct.length}
                        >Đặt hàng</button>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    )
}

export default Cart