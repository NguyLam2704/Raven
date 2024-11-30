import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CartMini from '../components/Cart/CartMini';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import img_product from '../assets/img_product.svg'
import cart from '../assets/cart_red.svg'
import Product from '../components/Product';
import back from '../assets/Back.svg'
import forward from '../assets/Forward.svg'
import { useNavigate } from 'react-router-dom';
import BangSize from '../assets/bang_size.svg'

//Chi tiết sản phẩm
const DetailProduct = () =>{
    //Kiểm soát hiển thị thnah giỏ hàng
    const [isCartMini, setCart] =useState(false)
    const handleCart = () => {
        setCart(!isCartMini)
    }

    //Kiểm soát hiển thị bảng size
    const [isBangSise, setBangSize] = useState(false)
    const ListProduct = [
        {
          key: 1,
          name: "Cao Quốc Kiệt",
          price: 1000000,
          img: img_product,
          sale: 20,
        },
        {
            key: 2,
            name: "Cao Quốc Kiệt",
            price: 1000000,
            img: img_product,
            sale: 0,
          },
          {
            key: 3,
            name: "Cao Quốc Kiệt",
            price: 100000,
            img: img_product,
            sale: 0,
          },
          {
            key: 2,
            name: "Cao Quốc Kiệt",
            price: 1000000,
            img: img_product,
            sale: 0,
          },
    ];

    const navigate = useNavigate()

    return(        
        <div className={`w-full  ${(isCartMini || isBangSise) ? 'overflow-hidden h-screen' : 'overflow-auto'}`}>
            <Navigation/>
            <div className='w-full mt-[90px] justify-items-center'>
                <div className='w-10/12 flex flex-row mt-40'>
                    {/* Các hình ảnh sản phẩm */}
                    <div className='w-3/5 flex flex-row'>
                        {/* Hình ảnh phụ */}
                        <div className='w-1/4 h-[470px] flex flex-col justify-between items-center'>
                            <button >
                                <FontAwesomeIcon icon={faChevronUp} />
                            </button>
                            <img className='h-[110px] w-[100px] rounded-md' src={img_product} alt="anh" />
                            <img className='h-[110px] w-[100px] rounded-md' src={img_product} alt="anh" />
                            <img className='h-[110px] w-[100px] rounded-md' src={img_product} alt="anh" />
                            
                            <button>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </div>
                        {/* Hình ảnh chính */}
                        <div className='w-3/4 '>
                            <img className='h-[470px] ' src={img_product} alt="anh" />
                        </div>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className='w-2/5 flex flex-col justify-between '>
                        {/* Tên sản phẩm */}
                        <div className='h-16 w-full content-center text-black text-3xl font-bold '>Áo Polo Raven Local Brand Unisex Flame </div>
                        {/* Giá sản phẩm */}
                        <div className='h-10 w-full flex flex-row border-b-2'>
                            <div className='h-10 content-center text-[#a91d3a] text-3xl font-bold '>195000đ</div>
                            <div className='h-10 content-center text-[#9f9f9f] text-xl font-medium line-through ml-20'>350000đ</div>
                        </div>
                        {/* Màu sắc */}
                        <div>
                            <div className='content-center text-black text-base font-normal'> Màu sắc</div>
                            <div className='flex flex-row'>
                                <button className='h-8 w-8 hover:shadow-md bg-white border rounded-md mr-5'/>
                                <button className='h-8 w-8 hover:shadow-md bg-red-400 border rounded-md mr-5'/>
                                <button className='h-8 w-8 hover:shadow-md bg-white border rounded-md mr-5'/>
                            </div>
                        </div>
                        {/* Size */}
                        <div>
                            <div className='h-10 flex flex-row'>
                                <div className='content-center text-black text-base font-normal '>Size</div>
                                <button  onClick={()=>setBangSize(true)} className='content-center hover:text-[15px] text-black text-sm font-extralight underline-offset-4 underline ml-20'>Bảng size</button>
                            </div>
                            {/* Ẩn/Hiện bảng size */}
                            {
                                isBangSise && (
                                    <div onClick={()=>setBangSize(false)} className='h-screen w-full bg-opacity-30 bg-black right-0 absolute top-0 z-50 content-center justify-items-center'>                          
                                        <img  src={BangSize} alt="bangsize" />                                
                                    </div>
                                )
                            }
                            <div className='flex flex-row'>
                                <button className='h-8 w-8 hover:text-[22px] content-center text-center text-black text-xl font-medium border border-black mr-5'>M</button>
                                <button className='h-8 w-8 hover:text-[22px] content-center text-center text-black text-xl font-medium border border-black mr-5'>L</button>
                                <button className='h-8 w-8 hover:text-[22px] content-center text-center text-black text-xl font-medium border border-black mr-5'>XL</button>
                            </div>
                        </div>
                        {/* Số lượng */}
                        <div className='h-8 flex flex-row'>
                            <div className='h-8 content-center text-black text-base font-normal '>Số lượng:</div>
                            <div className="flex flex-row ml-20">
                                {/* Giảm số lượng */}
                                <button className="h-8 w-9 border border-[#c4c4c4] bg-[#d9d9d9] "
                                    
                                >
                                    <FontAwesomeIcon className='h-3' icon={faMinus} />
                                </button>                
                                <div className="h-8 w-8 content-center text-center text-black text-base font-normal border border-[#c4c4c4] bg-[#d9d9d9] px-2 mx-[1px] ">1</div>
                                {/* Tăng số lượng */}
                                <button className=" h-8 w-9 border border-[#c4c4c4] bg-[#d9d9d9] "
                                    
                                >
                                    <FontAwesomeIcon className='h-3' icon={faPlus} />
                                </button>
                                
                            </div>
                        </div>
                        {/* Button */}
                        <div>
                            {/* Thêm sp vào giỏ hàng */}
                            <button onClick={handleCart} className="w-full h-11 flex flow-row items-center justify-center rounded-md border-[3px] border-[#c73659]">
                                <img className='h-6' src={cart} alt="cart" />
                                <div className=' content-center text-center text-[#c73659] text-xl font-extrabold ml-3 mt-1'>THÊM VÀO GIỎ </div>
                            </button>
                            {/* Mua ngay sp */}
                            <button className="w-full h-11 flex flow-row items-center text-white text-xl font-extrabold justify-center bg-[#c73659] rounded-md mt-3"
                                onClick={()=>navigate("/check_out")}
                            >
                                MUA NGAY
                            </button>
                        </div>

                    </div>
                </div>
                {/* Thông tin mô tả */}
                <div className='w-10/12 mt-14'>
                Hướng dẫn sử dụng sản phẩm Raven:- Ngâm áo vào NƯỚC LẠNH có pha giấm hoặc phèn chua từ trong 2 tiếng đồng hồ- Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.- Không dùng hóa chất tẩy.- Hạn chế sử dụng máy sấy và ủi (nếu có) thì ở nhiệt độ thích hợp.Chính sách bảo hành:- Miễn phí đổi hàng cho khách mua ở Raven trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận chuyển hàng.- Sản phẩm đổi trong thời gian 3 ngày kể từ ngày nhận hàng- Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.
                </div>

                {/* Sản phẩm tương tự */}
                <div className='w-10/12 mt-24'>
                    <div className='text-center text-[#a91d3a] text-[56px] font-semibold'>SẢN PHẨM TƯƠNG TỰ</div>                    
                </div>
                {/* Danh sách các sản phẩm tương tự */}
                <div className='w-full flex flex-row justify-center'>                       
                        <button class=" p-1 pr-2 bg-opacity-30 rounded-full ">
                            <img src={back} alt="none"/>
                        </button>                        
                        <div className='w-10/12 mt-6'>
                            <div className='grid grid-cols-4 gap-10'>
                                {ListProduct.map((product, index) => (
                                    <Product key={index} img={product.img} name={product.name} price={product.price} sale={product.sale}/>                            
                                ))}                      
                            </div>
                        </div>
                        <button  class=" p-1 pr-2 bg-white bg-opacity-30 rounded-full ">
                                <img  src={forward} alt="none"/>
                        </button>
                    </div>  
            </div>
            {/* Ẩn/Hiện thanh giỏ hàng */}
            { isCartMini && <CartMini handleCart={handleCart}/>}
            
            <Footer/>
        </div>
    )
}

export default DetailProduct