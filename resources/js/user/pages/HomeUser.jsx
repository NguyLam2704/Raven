import React, { useEffect, useState, useRef } from 'react';
import Product from '../components/Product';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Line from '../components/Home/Line';
import img_loading from '../assets/loading.gif'
import back from '../assets/Back.svg'
import forward from '../assets/Forward.svg'
import SliderHome from '../components/Home/SliderHome';
import TitleMore from '../components/Home/TitleMore';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Trang chủ
const HomeUser = () => {
    const swiperNewRef = useRef(null); // Swiper cho sản phẩm mới
    const swiperHighlightRef = useRef(null); // Swiper cho sản phẩm nổi bật
    const swiperSaleRef = useRef(null); // Swiper cho sản phẩm sale

    // State để lưu danh sách sản phẩm
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu


    
    //Kiểm soát mũi tên sản phẩm
    const handleBack = (swiperRef) => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    const handleForward = (swiperRef) => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    // Hàm fetch API
    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/v1/product?includeImage=true'); // fetch api include image
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json(); // Giả định API trả về JSON
            setProducts(data.data || []); // Lưu dữ liệu vào state
        } catch (err) {
            setError(err.message); // Lưu thông báo lỗi nếu xảy ra
        } finally {
            setLoading(false); // Kết thúc trạng thái tải
        }
    };

    //API gọi tăng lượt view
    const fetchAddView = async () => {
        await axios.get('/api/dashboard/views');
    }



    // useEffect để gọi fetchProducts khi component được render
    useEffect(() => {
        setLoading(true);
        fetchProducts();
        fetchAddView();
    }, []); // [] đảm bảo chỉ gọi API một lần khi component mount

    const navigate = useNavigate() ; 
    
    
    return(
        <div>
             { loading ? ( <div></div>) : (<Navigation/>) }
             <div className='w-full  border-2 mx-auto max-w-[1557px] '>
                <main className="items-center justify-center mx-auto w-full">
                    { loading ? ( <div></div>) : (<SliderHome/>) }
                    {/* Các sản phẩm mới */}
                    <div className="justify-items-center mt-20 "> 
                        {/* Tiêu đề */}
                        <div className="h-1/5 w-[80%] ">
                            <TitleMore type={"SẢN PHẨM MỚI"} load={loading} />
                        </div>
                        { loading ? (
                            <div>
                                <img className='w-10 h-10 mt-10' src={img_loading} alt="loading" />
                            </div>
                        ) : (
                            <div className="w-full flex flex-row justify-center items-center">
                            <button
                                onClick={() => handleBack(swiperNewRef)} 
                                className="p-1 pr-2 bg-opacity-30 rounded-full"
                            >
                                <img src={back} alt="none" />
                            </button>
                            <div className="w-[80%] justify-items-center">
                                <Swiper
                                    slidesPerView={4} // Hiển thị 1 slide mỗi lần (vì mỗi slide sẽ chứa 6 sản phẩm chia làm 2 hàng)
                                    mousewheel={true} // Cuộn bằng chuột
                                    onSwiper={(swiper) => (swiperNewRef.current = swiper)} // Lưu instance của Swiper                              
                                    breakpoints={{
                                        0: { slidesPerView: 2, spaceBetween: 10 },
                                        800: { slidesPerView: 3, spaceBetween: 10 },
                                        1200: { slidesPerView: 4, spaceBetween: 20 },
                                    }}
                                >
                                    {products
                                        .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted)) // Sắp xếp sản phẩm theo ngày
                                        .reduce((acc, product, index) => {
                                            const groupIndex = Math.floor(index / 2); // Nhóm mỗi 8 sản phẩm thành một slide
                                            if (!acc[groupIndex]) acc[groupIndex] = [];
                                            acc[groupIndex].push(product);
                                            return acc;
                                        }, [])
                                        .map((group, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="grid grid-row-2 gap-5 justify-items-center my-4">
                                                    {group.map((product, subIndex) => (
                                                        <div key={subIndex} className="flex flex-col items-center">
                                                            <Product
                                                                proId={product.proId}
                                                                price={product.cost}
                                                                img={product.productImage.find((img) => img.isPrimary)?.image} // Ảnh chính
                                                                name={product.productName}
                                                                sale={product.discount}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                            <button
                                onClick={() => handleForward(swiperNewRef)} 
                                className="p-1 pr-2bg-opacity-30 rounded-full"
                            >
                                <img src={forward} alt="none" />
                            </button>
                        </div>
                        

                        )}     
                    </div>

                        { loading ? ( <div></div>) : (<Line/>) }                

                        {/* Các sản phẩm nổi bật */}
                        <div className="  w-full  justify-items-center mt-20"> 
                            {/* Tiêu đề */}
                            <div className="h-1/5 w-[80%]">
                                <TitleMore type={"SẢN PHẨM NỔI BẬT"}  load={loading}/>
                            </div>

                        {/* Danh sách sản phẩm */}
                        { loading ? (
                            <div>
                                <img className='w-10 h-10 mt-10' src={img_loading} alt="loading" />
                            </div>
                        ) : (
                            <div className='w-full flex flex-row justify-center'>                       
                                <button className=" p-1 pr-2 bg-opacity-30 rounded-full "
                                    onClick={() => handleBack(swiperHighlightRef)}
                                    
                                >
                                    <img src={back} alt="none"/>
                                </button>                        
                                <div className="w-[80%] justify-items-center">
                                    <Swiper
                                        slidesPerView={4} // Hiển thị 1 slide mỗi lần (vì mỗi slide sẽ chứa 6 sản phẩm chia làm 2 hàng)
                                        mousewheel={true} // Cuộn bằng chuột
                                        onSwiper={(swiper) => (swiperHighlightRef.current = swiper)} // Lưu instance của Swiper
                                        speed={1000}
                                        breakpoints={{
                                            0: { slidesPerView: 2, spaceBetween: 10 },
                                            768: { slidesPerView: 2, spaceBetween: 10 },
                                            1200: { slidesPerView: 4, spaceBetween: 20 },
                                        }}
                                    >
                                        {products.sort((a,b) => {b.quantitySold - a.quantitySold}).slice(0,10)
                                            .reduce((acc, product, index) => {
                                                const groupIndex = Math.floor(index / 2); // Nhóm mỗi 8 sản phẩm thành một slide
                                                if (!acc[groupIndex]) acc[groupIndex] = [];
                                                acc[groupIndex].push(product);
                                                return acc;
                                            }, [])
                                            .map((group, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="grid grid-row-2 gap-10 justify-items-center my-4">
                                                        {group.map((product, subIndex) => (
                                                            <div key={subIndex} className="flex flex-col items-center">
                                                                <Product
                                                                    proId={product.proId}
                                                                    price={product.cost}
                                                                    img={product.productImage.find((img) => img.isPrimary)?.image} // Ảnh chính
                                                                    name={product.productName}
                                                                    sale={product.discount}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                </div>
                                <button className=" p-1 pr-2 bg-opacity-30 rounded-full "
                                    onClick={() => handleForward(swiperHighlightRef)} 
                                >
                                        <img  src={forward} alt="none"/>
                                </button>
                            </div>   
                        )} 
                                                        
                    </div>   

                        { loading ? ( <div></div>) : (<Line/>) }

                        {/* Các sản phẩm sale */}
                        <div className=" w-full  justify-items-center mt-20"> 
                            {/* Tiêu đề */}
                            <div className="h-1/5 w-[80%] ">
                                <TitleMore type={"SALE"}  load={loading}/>
                            </div>

                        {/* Danh sách sản phẩm */}
                        { loading ? (
                            <div>
                                <img className='w-10 h-10 mt-10'  src={img_loading} alt="loading" />
                            </div>
                        ) : (
                            <div className='w-full flex flex-row justify-center'>                       
                                <button className=" p-1 pr-2 bg-opacity-30 rounded-full "
                                    onClick={() => handleBack(swiperSaleRef)}
                                >
                                    <img src={back} alt="none"/>
                                </button>                        
                                <div className="w-[80%] justify-items-center">
                                <Swiper
                                    slidesPerView={4} // Hiển thị 1 slide mỗi lần (vì mỗi slide sẽ chứa 6 sản phẩm chia làm 2 hàng)
                                    mousewheel={true} // Cuộn bằng chuột
                                    onSwiper={(swiper) => (swiperSaleRef.current = swiper)} // Lưu instance của Swiper
                                    breakpoints={{
                                        0: { slidesPerView: 2, spaceBetween: 10 },
                                        768: { slidesPerView: 2, spaceBetween: 10 },
                                        1200: { slidesPerView: 4, spaceBetween: 20 },
                                    }}
                                >
                                    {products
                                        .filter((product) => product.discount > 0) // Sắp xếp sản phẩm theo ngày
                                        .reduce((acc, product, index) => {
                                            const groupIndex = Math.floor(index / 2); // Nhóm mỗi 8 sản phẩm thành một slide
                                            if (!acc[groupIndex]) acc[groupIndex] = [];
                                            acc[groupIndex].push(product);
                                            return acc;
                                        }, [])
                                        .map((group, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="grid grid-row-2  gap-10 justify-items-center my-4">
                                                    {group.map((product, subIndex) => (
                                                        <div key={subIndex} className="flex flex-col items-center">
                                                            <Product
                                                                proId={product.proId}
                                                                price={product.cost}
                                                                img={product.productImage.find((img) => img.isPrimary)?.image} // Ảnh chính
                                                                name={product.productName}
                                                                sale={product.discount}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                                <button className=" p-1 pr-2bg-opacity-30 rounded-full "
                                    onClick={() => handleForward(swiperSaleRef)} 
                                >
                                        <img  src={forward} alt="none"/>
                                </button>
                            </div> 
                        )} 
                                                            
                    </div>                    
                </main>
             </div>

            <Footer/>
        </div>

    )
}

export default HomeUser