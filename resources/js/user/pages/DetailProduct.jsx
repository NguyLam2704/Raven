import React, { useEffect, useState, useRef  } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CartMini from '../components/Cart/CartMini';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faPlus, faMinus, faChevronCircleRight, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import cart from '../assets/cart_red.svg'
import Product from '../components/Product';
import back from '../assets/Back.svg'
import forward from '../assets/Forward.svg'
import { useNavigate, useParams } from 'react-router-dom';
import SizeAo from '../assets/bang_size.svg'
import SizeQuanDai from '../assets/size_quandai.jpg'
import SizeQuanNgan from '../assets/size_quanngan.jpg'
import img_loading from '../assets/loading.gif'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

//Chi tiết sản phẩm
const DetailProduct = () =>{
    const swiperRef = useRef(null);
    const swiperRefMoblie = useRef(null);
    const swiperSameRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Theo dõi slide hiện tại

    // Xử lý khi nhấn nút "Up"
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            swiperRef.current?.slideTo(currentIndex - 1);
            swiperRefMoblie.current?.slideTo(currentIndex - 1);
        }
    };

    // Xử lý khi nhấn nút "Down"
    const handleNext = () => {
        if (currentIndex < DetailProduct.productImage.length - 3) {
            setCurrentIndex((prev) => prev + 1);
            swiperRef.current?.slideTo(currentIndex + 1);
            swiperRefMoblie.current?.slideTo(currentIndex + 1);
        }
    };
    //Kiểm soát nút qua lại
    const handleBack = (swiperRef) => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    const handleForward = (swiperRef) => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };
    // get proid from url
    const {proId} = useParams();
    const [cartProduct, setcartProduct] = useState(null);
    
    //Nhận giá trị ảnh lớn sản phẩm    
    const [bigImg,setBigImg] = useState('')
   
    //Kiểm soát hiển thị thnah giỏ hàng
    const [isCartMini, setCart] =useState(false)
    const handleCart = () => {
        // Lấy danh sách sản phẩm từ localStorage (nếu chưa có thì trả về mảng rỗng)
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProductIndex = cart.findIndex((item) => item.proId === cartProduct.proId && item.color === selectedColor && item.size === selectedSize);

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã có, tăng số lượng
            cart[existingProductIndex].quantity += quality;
        } else {
            // Nếu sản phẩm chưa có, thêm sản phẩm với số lượng ban đầu là 1
            cart.push({ ...cartProduct, color: selectedColor, size: selectedSize, quantity: quality, sizeId: selectedSizeId, colorId: selectedColorId, colorName: selectedColorName});
        }
        // Cập nhật lại localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Thông báo (tuỳ chọn)
        //  alert('Sản phẩm đã được thêm vào giỏ hàng!');
        setCart(!isCartMini)
        
    }
  
    // const[ListProduct, setLi]
    const [DetailProduct, setDetailProduct] = useState(null);
    const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
    // const [error, setError] = useState(null); // Trạng thái lỗi
    const [categoryType, setCategory] = useState(null); // categroy type of detail product
    const fetchDetail = async() => {
        try {
            const response = await fetch(`/api/v1/product?proId[eq]=${proId}&includeProColorSize=true&includeImage=true`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json(); // Giả định API trả về JSON
            setDetailProduct(data.data[0]); // Lưu dữ liệu vào state
            setCategory(data.data[0].categoryTypeId);
            setBigImg(data.data[0].productImage.find(img => img.isPrimary)?.image)
            
            if (data?.data?.[0]){
            const newcartProduct = {
                proId: data.data[0].proId,
                productName: data.data[0].productName,
                cost: data.data[0].cost,
                discount: data.data[0].discount,
                // quantity: quality,
                productImage: data.data[0].productImage.find(img => img.isPrimary)?.image,                
            }
            setcartProduct(newcartProduct);}
        } catch (err) {
            setError(err.message); // Lưu thông báo lỗi nếu xảy ra
        } finally {
            setLoading(false); // Kết thúc trạng thái tải
        }
    }
    //Kiểm soát hiển thị bảng size
    const [isBangSise, setBangSize] = useState(false)
    const [products, setProducts] = useState([]); // sản phẩm tương tự
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
    
    useEffect(() => {
        setLoading(true);
        fetchDetail();
        fetchProducts();
        handlerBangSize()
    }, [proId])
    const navigate = useNavigate()
    //Nhận giá trị số lượng sản phẩm
    const [quality, setQuality] = useState(1)
    //Nhận giá trị màu sắc
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedColorName, setSelectedColorName] = useState(null);
    //nhận giá trị size 
    const [selectedSize, setSelectedSize] = useState(null);
    //Nhận giá trị id color
    const [selectedColorId, setColorId] = useState(null);
    //Nhận giá trị id size
    const [selectedSizeId, setSizeId] = useState(null);
    
    //Loai bang size
    const [BangSize, setBang] = useState()
    const handlerBangSize = () => {
        if(categoryType == 6){
            setBang(SizeQuanDai)
        }else if(categoryType == 7){
            setBang(SizeQuanNgan)
        }else{
            setBang(SizeAo)
        }
    }
    return(   
        <div>
            <div className={`w-full  ${(isCartMini || isBangSise) ? 'overflow-hidden h-screen' : 'overflow-auto'}`}>
                <Navigation/>
                { (!DetailProduct || loading) ? (
                        <div className='w-full h-screen flex justify-center items-center'>
                            <img className='w-1/12' src={img_loading} alt="loading" />
                        </div> 
                ) :(
                <div className='w-full max-w-[1557px] border-2 mx-auto mt-[90px] justify-items-center '>
                    
                    <div className='border-2 border-red-700 w-full ipad:w-[90%] desktop:w-[70%] desktop:flex desktop:flex-row mt-10'>
                    {/* Các hình ảnh sản phẩm */}
                    <div className='desktop:w-3/5 border-2 border-blue-700 flex desktop:flex-row mobile:flex-col justify-center'>
                        {/* Hình ảnh phụ desktop */}
                        <div className='w-1/4 desktop:h-[470px] mobile:hidden desktop:flex flex-col justify-between items-center'>
                            {/* Nút lên */}
                            <button
                                onClick={handlePrev}
                                className={`text-gray-500 hover:text-black ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={currentIndex === 0}
                            >
                                <FontAwesomeIcon icon={faChevronUp} />
                            </button>

                            {/* Swiper */}
                            <div className='overflow-hidden flex flex-col h-full'>
                                <Swiper
                                    direction={'vertical'}
                                    slidesPerView={3} // Hiển thị 3 ảnh mỗi lần
                                    onSwiper={(swiper) => (swiperRef.current = swiper)} // Lưu instance của Swiper
                                    mousewheel={true} 
                                    className='h-full'
                                >
                                {DetailProduct.productImage?.map((element, index) => (
                                    <SwiperSlide key={index}>
                                    <button
                                        className='h-[110px] w-[100px] rounded-md my-4'
                                        onClick={()=>setBigImg(element.image)}
                                    >
                                        <img
                                        className='h-full w-full rounded-md object-cover'
                                        src={element.image}
                                        alt={`Thumbnail ${index + 1}`}
                                        />
                                    </button>
                                    </SwiperSlide>
                                ))}
                                </Swiper>
                            </div>

                            {/* Nút xuống */}
                            <button
                                onClick={handleNext}
                                className={`text-gray-500 hover:text-black ${
                                currentIndex >= DetailProduct.productImage.length - 3 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={currentIndex >= DetailProduct.productImage.length - 3}
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </div>

                                               
                        {/* Hình ảnh chính */}
                        <div className='desktop:w-3/4 border flex justify-center items-center'>
                            {/* Hiển thị thẻ discount khi có discount */}
                            {DetailProduct.discount  > 0 && (
                                <div className="absolute mobile:h-[440px] mobile:w-[80%] ipad:h-[478px] ipad:w-[400px]">
                                    <div className="w-12 h-12  content-center bg-[#a91d3a] text-center text-white text-base rounded-b-md font-normal font-['Public Sans']">
                                        {DetailProduct.discount}%<br />OFF
                                    </div>
                                </div>
                            )}
                            {/* Hình ảnh sản phẩm */}
                            <img className='mobile:h-[440px] mobile:w-full ipad:h-[478px] ipad:w-[400px] border border-[#1E0342] rounded-xl' src={bigImg} alt="anh" />                             
                        </div>

                        {/* Hình ảnh phụ mobile, ipad*/}
                        <div className='border-4 mt-2 mobile:flex desktop:hidden justify-between flex-row items-center'>
                            {/* Nút lên */}
                            <button
                                onClick={handlePrev}
                                className={`w-[10%] text-gray-500 border hover:text-black ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={currentIndex === 0}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>

                            {/* Swiper */}
                            <div className='overflow-hidden w-[80%] flex flex-row'>
                                <Swiper
                                    direction={'horizontal'}
                                    //slidesPerView={4} // Hiển thị 3 ảnh mỗi lần
                                    onSwiper={(swiper) => (swiperRefMoblie.current = swiper)} // Lưu instance của Swiper
                                    mousewheel={true} 
                                    className='h-full'
                                    breakpoints={{
                                        0: { slidesPerView: 2 },
                                        768: { slidesPerView: 3 },
                                        1024: { slidesPerView: 4 },
                                    }}
                                >
                                    {DetailProduct.productImage?.map((element, index) => (
                                        <SwiperSlide 
                                            key={index}
                                            className='w-auto flex flex-row justify-center items-center border-2 border-indigo-600 '
                                        >
                                            <button
                                                className='h-[110px] w-[120px] ml-[5px] border border-red-600 rounded-md'
                                                onClick={()=>setBigImg(element.image)}
                                            >
                                                <img
                                                className='h-full w-full rounded-md object-cover'
                                                src={element.image}
                                                alt={`Thumbnail ${index + 1}`}
                                                />
                                            </button>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Nút xuống */}
                            <button
                                onClick={handleNext}
                                className={`w-[10%] text-gray-500 hover:text-black ${
                                currentIndex >= DetailProduct.productImage.length - 3 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={currentIndex >= DetailProduct.productImage.length - 3}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                        
                        
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className='border-2 mobile:px-2 ipad:px-0 border-green-700 mobile:mt-5 mobile:gap-2 ipad:gap-5 desktop:mt-0 desktop:w-2/5 flex flex-col justify-between '>
                        {/* Tên sản phẩm */}
                        <div className='w-full content-center text-[#1E0342] desktop:text-3xl ipad:text-2xl font-bold '>{DetailProduct.productName} </div>
                        {/* Giá sản phẩm */}
                        <div >
                            <div className=' flex flex-row '>
                                <div className=' content-center text-[#a91d3a] desktop:text-3xl mobile:text-xl font-bold '>{(DetailProduct.cost - (DetailProduct.cost* DetailProduct.discount / 100)).toLocaleString('vi-VN')}đ</div>
                                {
                                    DetailProduct.discount > 0 && (
                                        <div className='content-center text-[#9f9f9f] desktop:text-xl mobile:text-lg font-medium line-through desktop:ml-20 ipad:ml-16'>{DetailProduct.cost.toLocaleString('vi-VN')}đ</div>
                                    )
                                }
                            </div> 
                            <div className='h-[1px] bg-gray-300'></div>
                        </div>
                        {/* Màu sắc */}
                        <div>
                            <div className='content-cente mb-1 text-black desktop:text-base ipad:text-sm font-normal'> Màu sắc</div>
                            <div className='flex flex-row'>
                                {DetailProduct.proColorSize
                                    .filter((value, index, self) => {
                                        // Loại bỏ các màu trùng lặp (kiểm tra bằng colorCode)
                                        return index === self.findIndex((t) => (
                                            // findIndex tìm chỉ số của phần tử đầu tiên có colorCode trùng với phần tử hiện tại. 
                                            // Nếu index của phần tử hiện tại bằng chỉ số của phần tử đầu tiên có colorCode trùng 
                                            // thì phần tử đó sẽ được giữ lại.
                                                t.color.colorCode === value.color.colorCode 
                                            ));
                                        })
                                    .map((element,index) => {
                                        const totalQuantity = DetailProduct.proColorSize .filter((item) => item.colorId === element.colorId) .reduce((sum, item) => sum + item.quantityAvailable, 0);
                                        const quanlitySize = DetailProduct?.proColorSize .find((item) => item.colorId === element.colorId && item.size.sizeCode === selectedSize)?.quantityAvailable && 1                                            
                                        return (
                                                <button 
                                                    key={index}                                          
                                                    onClick={() => {
                                                        if((totalQuantity && (selectedSize ? quanlitySize : 1)) || selectedColor===element.color.colorCode)
                                                        {
                                                            if(selectedColor===element.color.colorCode) {
                                                                    setSelectedColor('');
                                                                    setColorId('');
                                                                    setSelectedColorName('');
                                                                }
                                                            else {
                                                                setSelectedColor(element.color.colorCode)
                                                                setColorId(element.colorId);
                                                                setSelectedColorName(element.color.colorName)
                                                            }
                                                        }
                                                        else alert(`Sản phẩm màu ${element.color.colorName} đã hết hàng. Vui lòng chọn màu sắc khác`)
                                                    }}
                                                    className={`desktop:h-8 desktop:w-8 mobile:h-7 mobile:w-7 rounded-md mr-5 ${selectedColor === element.color.colorCode ? 'ring-[#c73659] ring-2' : 'ring-[#EEEEEE] ring-1'} `} 
                                                    style={{ backgroundColor: element.color.colorCode }} 
                                                >
                                                </button>
                                    )
                                })}
                                    
                                       
                            </div>
                        </div>
                        {/* Size */}
                        {
                            categoryType !== 8 && categoryType !== 9 && categoryType !== 10 && categoryType !== 11 && 
                            <div>
                            <div className='mb-1 flex flex-row'>
                                <div className='content-center text-black desktop:text-base ipad:text-sm font-normal '>Size</div>
                                <button  onClick={()=>setBangSize(true)} className='content-center hover:text-gray-600 hover:decoration-gray-500 text-black desktop:text-sm ipad:text-xs font-light underline-offset-4 underline ml-20'>Bảng size</button>
                            </div>
                            {/* Ẩn/Hiện bảng size */}
                            {
                                isBangSise && (
                                    <div onClick={()=>setBangSize(false)} className='h-screen w-full bg-opacity-30 bg-black right-0 absolute top-0 z-50 content-center justify-items-center'>                          
                                        <img className='w-1/2' src={BangSize} alt="bangsize" />                                
                                    </div>
                                )
                            }
                            <div className='flex flex-row'>
                                
                                {DetailProduct.proColorSize
                                    .filter((value, index, self) => {
                                        return index == self.findIndex((t) => (
                                            t.size.sizeCode === value.size.sizeCode
                                        ));
                                    })
                                    .map((element,index) => {
                                        const totalQuantity = DetailProduct.proColorSize .filter((item) => item.sizeId === element.sizeId) .reduce((sum, item) => sum + item.quantityAvailable, 0); 
                                        const quanlityColor = DetailProduct?.proColorSize .find((item) => item.sizeId === element.sizeId && item.color.colorCode === selectedColor)?.quantityAvailable && 1
                                        return (
                                        <button 
                                            key = {index}                                             
                                            onClick={() => {
                                                if(totalQuantity && (selectedColor? quanlityColor : 1) || selectedSize===element.size.sizeCode)
                                                    {
                                                        if(selectedSize===element.size.sizeCode){
                                                            setSelectedSize('');
                                                            setSizeId('');
                                                        }
                                                        else {
                                                            setSelectedSize(element.size.sizeCode)
                                                            setSizeId(element.sizeId);
                                                        }
                                                    }
                                                else {alert(`Sản phẩm size ${element.size.sizeCode} đã hết hàng. Vui lòng chọn size khác`)}
                                            }}                                           
                                            className={`desktop:h-8 desktop:w-8 mobile:h-7 mobile:w-7  content-center text-center desktop:text-xl ipad:text-lg  mr-5 ${(selectedSize === element.size.sizeCode) ? 'text-[#c73659] border-[#c73659] border-2 font-bold': (totalQuantity && (selectedColor? quanlityColor : 1) )? 'text-black border border-black font-medium': 'text-gray-400 border border-gray-400 font-medium'} `}>
                                            {element.size.sizeCode}
                                            
                                        </button>
                                        
                                        )
                                    })}
                                    
                            </div>          
                        </div>
                        }
                        {/* Số lượng */}
                        <div className='h-8 flex flex-row'>
                            <div className='h-8 content-center text-black text-base font-normal font-Public '>Số lượng:</div>
                            <div className="flex flex-row ml-20">
                                {/* Giảm số lượng */}
                                <button className={`desktop:h-8 desktop:w-8 mobile:h-7 mobile:w-7  border border-[#c4c4c4] bg-[#d9d9d9] ${(quality>1)?'opacity-100':'opacity-70 cursor-not-allowed'} `}
                                    onClick={()=>{
                                        if(quality > 1)
                                            setQuality(quality-1)
                                    }}
                                >
                                    <FontAwesomeIcon className='h-3' icon={faMinus} />
                                </button>                
                                <div className="desktop:h-8 desktop:w-8 mobile:h-7 mobile:w-7  content-center text-center text-black text-base font-normal border border-[#c4c4c4] bg-[#d9d9d9] mx-[1px] ">{quality}</div>
                                {/* Tăng số lượng */}
                                <button className={`desktop:h-8 desktop:w-8 mobile:h-7 mobile:w-7  border border-[#c4c4c4] bg-[#d9d9d9] ${(quality < (DetailProduct?.proColorSize .find((item) => item.color.colorCode === selectedColor  && item.size.sizeCode === selectedSize)?.quantityAvailable))?'opacity-100':'opacity-70 cursor-not-allowed'} `}
                                    onClick={()=>setQuality(quality+1)}
                                    disabled={!(quality<(DetailProduct?.proColorSize .find((item) => item.color.colorCode === selectedColor  && item.size.sizeCode === selectedSize)?.quantityAvailable))}
                                >
                                    <FontAwesomeIcon className='h-3' icon={faPlus} />
                                </button>
                                
                            </div>
                        </div>
                        {/* Button */}
                        <div>
                            {/* Thêm sp vào giỏ hàng */}
                            <button  className="w-full desktop:h-11 mobile:h-9 flex flow-row items-center justify-center rounded-md border-[3px] border-[#1E0342] border:bg-[#a91d3a] "
                                onClick={()=> {
                                    if(selectedColor && selectedSize)
                                    {
                                        handleCart()
                                    }
                                    else alert('Vui lòng chọn màu sắc và kích thước!')
                                    }}
                                title={!selectedColor || !selectedSize ? 'Vui lòng chọn màu sắc và số lượng' : ''}
                            >
                                <img className='desktop:h-6 ipad:h-5' src={cart} alt="cart" />
                                <div className=' content-center text-center text-[#1E0342] desktop:text-xl mobile:text-lg font-extrabold ml-3 mt-1 active:text-[#a91d3a]'>THÊM VÀO GIỎ </div>
                            </button>
                            {/* Mua ngay sp */}
                            <button className="w-full desktop:h-11 mobile:h-9 flex flow-row items-center text-white desktop:text-xl mobile:text-lg font-extrabold justify-center bg-[#1E0342] rounded-md mt-3"
                                onClick={()=> {
                                    if(selectedColor && selectedSize)
                                    {
                                    const updateCartProduct = {
                                        ...cartProduct,
                                        size: selectedSize,
                                        color: selectedColor,
                                        quantity: quality,
                                        sizeId: selectedSizeId,
                                        colorId: selectedColorId,
                                        colorName: selectedColorName
                                    };
                                    navigate("/check_out", { state: { product: updateCartProduct} })}
                                    else alert('Vui lòng chọn màu sắc và kích thước!')
                                    }}>
                                MUA NGAY
                            </button>
                        </div>

                    </div>
                </div>

                    {/* Thông tin mô tả */}
                    <div className='w-[90%] desktop:w-[70%] border-2 mt-14 font-medium font-Public text-justify'>
                    
                        {DetailProduct.description.split('\n').map((line, index) => (
                            <React.Fragment key={index} >
                            {line}
                            <br />
                            </React.Fragment>
                        ))}
                            
                    </div>

                    {/* Sản phẩm tương tự */}
                    <div className='w-[80%] mt-24'>
                        <div className='text-center text-[#1E0342] desktop:text-4xl ipad:text-3xl font-semibold mb-4'>SẢN PHẨM TƯƠNG TỰ</div>                    
                    </div>
                    {/* Danh sách các sản phẩm tương tự */}
                    <div className='w-full flex flex-row justify-center'>                       
                            <button className=" p-1 pr-2 bg-opacity-30 rounded-full "
                                onClick={() => handleBack(swiperSameRef)}
                            >
                                <img src={back} alt="none"/>
                            </button>                        
                            <div className="w-[80%] justify-items-center">
                                <Swiper
                                    slidesPerView={4} // Hiển thị 1 slide mỗi lần (vì mỗi slide sẽ chứa 6 sản phẩm chia làm 2 hàng)
                                    mousewheel={true} // Cuộn bằng chuột
                                    onSwiper={(swiper) => (swiperSameRef.current = swiper)} // Lưu instance của Swiper
                                    speed={500}
                                    breakpoints={{
                                        640: { slidesPerView: 2, spaceBetween: 10 },
                                        768: { slidesPerView: 2, spaceBetween: 10 },
                                        1200: { slidesPerView: 4, spaceBetween: 20 },
                                    }}
                                    autoplay={{
                                        delay: 1000, // Tự động chuyển trang sau 3 giây
                                        disableOnInteraction: false, // Không dừng autoplay khi người dùng tương tác
                                    }}
                                >
                                    {products
                                        .filter((product) => product.proId != proId) // Sắp xếp sản phẩm theo ngày
                                        .reduce((acc, product, index) => {
                                            const groupIndex = Math.floor(index / 1); // Nhóm mỗi 8 sản phẩm thành một slide
                                            if (!acc[groupIndex]) acc[groupIndex] = [];
                                            acc[groupIndex].push(product);
                                            return acc;
                                        }, [])
                                        .map((group, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="grid grid-row-1 justify-items-center my-4">
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
                            <button  className=" p-1 pr-2 bg-opacity-30 rounded-full "
                                onClick={() => handleForward(swiperSameRef)}
                            >
                                    <img  src={forward} alt="none"/>
                            </button>
                        </div>  
                </div>

            )}  
                {/* Ẩn/Hiện thanh giỏ hàng */}
                { isCartMini && <CartMini handleCart={()=>setCart(!isCartMini)}/>}
                <Footer/>
            </div>
        </div>

    )
}

export default DetailProduct