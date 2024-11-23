import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ItemProduct from "../components/Cart/ItemProduct";
import img_product from '../assets/img_product.svg'
import { useNavigate } from "react-router-dom";

//Giỏ hàng
const Cart = () => {

    const [ListProduct, setList] = useState([]);
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
    // const [ListProduct, setList] = useState([
    //     {
    //       key: 1,
    //       name: "Cao Quốc Kiệt",
    //       price: 1000000,
    //       img: img_product,
    //       sale: 20,
    //       quality: 1,
    //       color: "Xanh",
    //       size: "L"
    //     },
    //     {
    //         key: 2,
    //         name: "Cao Quốc Kiệt",
    //         cost: 1000000,
    //         img: img_product,
    //         sale: 0,
    //         quality: 2,
    //         color: "Xanh",
    //         size: "L"
    //       },
    //       {
    //         key: 3,
    //         name: "Cao Quốc Kiệt",
    //         cost: 1000000,
    //         img: img_product,
    //         sale: 0,
    //         quality: 3,
    //         color: "Xanh",
    //         size: "L"
    //       }
    // ]);
    
    return(
        <div className="w-full">
            <Navigation/>
            <div className="w-full justify-items-center pt-24 mt-16 ">
                <div className="text-black text-2xl font-bold uppercase ">Giỏ hàng của bạn</div>               
                <div className="w-10/12 flex flex-row border-b-[1px] border-[#C4C4C4] py-2 mt-16">
                    <div className="w-6/12"></div>
                    <div className="w-2/12 text-center text-black text-lg font-bold">Số lượng</div>
                    <div className="w-2/12 text-center text-black text-lg font-bold">Giá tiền</div>
                </div>
                {/* Danh sách các sản phẩm */}
                {ListProduct.map((product, index) => (
                    <ItemProduct key={index} product={product} />                            
                ))}
                {/* {
                    <ItemProduct data={ListProduct} />
                } */}
                {/* Tổng giá các sản phẩm trong giỏ được check */}
                <div className="w-10/12 flex flex-row py-2 mt-5">
                    <div className="w-6/12"></div>
                    <div className="w-2/12 text-end text-black text-lg font-bold">Tổng tiền:</div>
                    <div className="w-2/12 text-center text-[#a91d3a] text-xl font-bold">10000000đ</div>
                </div>
                {/* Nút thanh toán */}
                <div className="w-10/12 flex flex-row justify-end mt-16 pr-8 ease-in duration-300">
                    <button onClick={( ) => navigate("/check_out")} className="w-36 h-10 bg-[#c73659] rounded-[5px] border border-[#151515] text-center text-[#eeeeee] text-[17px] font-bold ">Thanh toán</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Cart