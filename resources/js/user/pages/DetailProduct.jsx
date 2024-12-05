import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CartMini from '../components/Cart/CartMini';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import cart from '../assets/cart_red.svg'
import Product from '../components/Product';
import back from '../assets/Back.svg'
import forward from '../assets/Forward.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SizeAo from '../assets/bang_size.svg'
import SizeQuanDai from '../assets/size_quandai.jpg'
import SizeQuanNgan from '../assets/size_quanngan.jpg'
import img_loading from '../assets/loading.gif'

//Chi tiết sản phẩm
const DetailProduct = () =>{
    // get proid from url
    const {proId} = useParams();
    const [cartProduct, setcartProduct] = useState(null);
    
    //Nhận giá trị ảnh lớn sản phẩm    
    const [bigImg,setBigImg] = useState('')
   
    //Kiểm soát hiển thị thnah giỏ hàng
    const [isCartMini, setCart] =useState(false)
    const handleCart = () => {
        if (selectedColor && selectedSize){
        // Lấy danh sách sản phẩm từ localStorage (nếu chưa có thì trả về mảng rỗng)
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProductIndex = cart.findIndex((item) => item.proId === cartProduct.proId && item.color === selectedColor && item.size === selectedSize);

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã có, tăng số lượng
            cart[existingProductIndex].quantity += quality;
        } else {
            // Nếu sản phẩm chưa có, thêm sản phẩm với số lượng ban đầu là 1
            cart.push({ ...cartProduct, color: selectedColor, size: selectedSize, quantity: quality });
        }
        // Cập nhật lại localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Thông báo (tuỳ chọn)
        //  alert('Sản phẩm đã được thêm vào giỏ hàng!');
        setCart(!isCartMini)
        }
        else {
            console.log("empty color or empty size")
        }
    }
  
    // const[ListProduct, setLi]
    const [DetailProduct, setDetailProduct] = useState(null);
    const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Trạng thái lỗi
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
    //nhận giá trị size 
    const [selectedSize, setSelectedSize] = useState(null);
    
    //Nút mũi tên
    const [NumberBack, setBack] = useState(0)
    const [NumberForward, setForward] = useState(4)
    const hanlderBack = () =>{
        if( NumberBack > 1 ){            
            setBack( NumberBack - 4 )
            setForward( NumberForward - 4 )
        }
    }
    const hanlderForward = () =>{
        if( NumberForward < products.length ){
            setBack( NumberBack + 4 )
            setForward( NumberForward + 4 )
        }
    }
    //Loai bang size
    const [BangSize, setBang] = useState()
    const handlerBangSize = () => {
        if(categoryType===6){
            setBang(SizeQuanDai)
        }else if(categoryType===7){
            setBang(SizeQuanNgan)
        }else{
            setBang(BangSize)
        }
    }
    console.log(categoryType)
    return(        
        <div className={`w-full  ${(isCartMini || isBangSise) ? 'overflow-hidden h-screen' : 'overflow-auto'}`}>
            <Navigation/>
            { (!DetailProduct || loading) ? (
                    <div className='w-full h-screen flex justify-center items-center'>
                        <img className='w-1/12' src={img_loading} alt="loading" />
                    </div> 
            ) :(
            <div className='w-full mt-[90px] justify-items-center '>
                
                <div className='w-10/12 flex flex-row mt-40'>
                    {/* Các hình ảnh sản phẩm */}
                    <div className='w-3/5 flex flex-row'>
                        {/* Hình ảnh phụ */}
                        <div className='w-1/4 h-[470px] flex flex-col justify-between items-center'>
                            <div className=' w-[100px] flex flex-col h-full justify-between'>
                            {DetailProduct.productImage.filter(image => !image.isPrimary).slice(0,4).map((element,index) => {
                                return (
                                    <button className='h-[110px] w-[100px] rounded-md '
                                        key = {index}
                                        onClick={()=>setBigImg(element.image)}
                                    >
                                        <img  className='h-[110px] w-[100px] rounded-md ' src={element.image} alt="anh" />
                                    </button>
                                )
                            })}  
                            </div>
                        </div>                        
                        {/* Hình ảnh chính */}
                        <div className='w-3/4 '>
                            {/* Hiển thị thẻ discount khi có discount */}
                            {DetailProduct.discount  > 0 && (
                                <div className="absolute w-[250px] h-[350px]">
                                    <div className="w-12 h-12 ml-4 content-center bg-[#a91d3a] text-center text-white text-base rounded-b-md font-normal font-['Public Sans']">
                                        {DetailProduct.discount}%<br />OFF
                                    </div>
                                </div>
                            )}
                            {/* Hình ảnh sản phẩm */}
                            <img className='h-[470px] w-4/5 rounded-xl' src={bigImg} alt="anh" />                            
                        </div>
                        
                        
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className='w-2/5 flex flex-col justify-between '>
                        {/* Tên sản phẩm */}
                        <div className='w-full content-center text-black text-3xl font-bold '>{DetailProduct.productName} </div>
                        {/* Giá sản phẩm */}
                        <div className='h-10 w-full flex flex-row border-b-2'>
                            <div className='h-10 content-center text-[#a91d3a] text-3xl font-bold '>{(DetailProduct.cost - (DetailProduct.cost* DetailProduct.discount / 100)).toLocaleString('vi-VN')}đ</div>
                            {
                                DetailProduct.discount > 0 && (
                                    <div className='h-10 content-center text-[#9f9f9f] text-xl font-medium line-through ml-20'>{DetailProduct.cost.toLocaleString('vi-VN')}đ</div>
                                )
                            }
                        </div>
                        {/* Màu sắc */}
                        <div>
                            <div className='content-center text-black text-base font-normal'> Màu sắc</div>
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
                                                            if(selectedColor===element.color.colorCode)
                                                                setSelectedColor('')
                                                            else    setSelectedColor(element.color.colorCode)
                                                        }
                                                        else alert(`Sản phẩm màu ${element.color.colorName} đã hết hàng. Vui lòng chọn màu sắc khác`)
                                                    }}
                                                    className={`h-8 w-8 rounded-md mr-5 ${selectedColor === element.color.colorCode ? 'ring-[#c73659] ring-2' : 'ring-[#EEEEEE] ring-1'} `} 
                                                    style={{ backgroundColor: element.color.colorCode }} 
                                                >
                                                </button>
                                    )
                                })}
                                    
                                       
                            </div>
                        </div>
                        {/* Size */}
                        <div>
                            <div className='h-10 flex flex-row'>
                                <div className='content-center text-black text-base font-normal '>Size</div>
                                <button  onClick={()=>setBangSize(true)} className='content-center hover:text-gray-600 hover:decoration-gray-500 text-black text-sm font-light underline-offset-4 underline ml-20'>Bảng size</button>
                            </div>
                            {/* Ẩn/Hiện bảng size */}
                            {
                                isBangSise && (
                                    <div onClick={()=>setBangSize(false)} className='h-screen w-full bg-opacity-30 bg-black right-0 absolute top-0 z-50 content-center justify-items-center'>                          
                                        <img className='h-3/4' src={BangSize} alt="bangsize" />                                
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
                                                        if(selectedSize===element.size.sizeCode)
                                                            setSelectedSize('')
                                                        else    setSelectedSize(element.size.sizeCode)
                                                    }
                                                else {alert(`Sản phẩm size ${element.size.sizeCode} đã hết hàng. Vui lòng chọn size khác`)}
                                            }}                                           
                                            className={`h-8 w-8 content-center text-center text-xl  mr-5 ${(selectedSize === element.size.sizeCode) ? 'text-[#c73659] border-[#c73659] border-2 font-bold': (totalQuantity && (selectedColor? quanlityColor : 1) )? 'text-black border border-black font-medium': 'text-gray-400 border border-gray-400 font-medium'} `}>
                                            {element.size.sizeCode}
                                            
                                        </button>
                                        
                                        )
                                    })}
                                    
                            </div>

                            
                                           
                        </div>
                        {/* Số lượng */}
                        <div className='h-8 flex flex-row'>
                            <div className='h-8 content-center text-black text-base font-normal '>Số lượng:</div>
                            <div className="flex flex-row ml-20">
                                {/* Giảm số lượng */}
                                <button className="h-8 w-9 border border-[#c4c4c4] bg-[#d9d9d9] "
                                    onClick={()=>{
                                        if(quality > 1)
                                            setQuality(quality-1)
                                    }}
                                >
                                    <FontAwesomeIcon className='h-3' icon={faMinus} />
                                </button>                
                                <div className="h-8 w-8 content-center text-center text-black text-base font-normal border border-[#c4c4c4] bg-[#d9d9d9] mx-[1px] ">{quality}</div>
                                {/* Tăng số lượng */}
                                <button className=" h-8 w-9 border border-[#c4c4c4] bg-[#d9d9d9] "
                                    onClick={()=>setQuality(quality+1)}
                                >
                                    <FontAwesomeIcon className='h-3' icon={faPlus} />
                                </button>
                                
                            </div>
                        </div>
                        {/* Button */}
                        <div>
                            {/* Thêm sp vào giỏ hàng */}
                            <button  className="w-full h-11 flex flow-row items-center justify-center rounded-md border-[3px] border-[#c73659] border:bg-[#a91d3a] "
                                onClick={handleCart}
                                title={!selectedColor || !selectedSize ? 'Vui lòng chọn màu sắc và số lượng' : ''}
                                disabled={!selectedColor || !selectedSize }
                            >
                                <img className='h-6' src={cart} alt="cart" />
                                <div className=' content-center text-center text-[#c73659] text-xl font-extrabold ml-3 mt-1 active:text-[#a91d3a]'>THÊM VÀO GIỎ </div>
                            </button>
                            {/* Mua ngay sp */}
                            <button className="w-full h-11 flex flow-row items-center text-white text-xl font-extrabold justify-center bg-[#c73659] rounded-md mt-3"
                                onClick={()=> {
                                    if(selectedColor && selectedSize)
                                    {
                                    const updateCartProduct = {
                                        ...cartProduct,
                                        size: selectedSize,
                                        color: selectedColor,
                                        quantity: quality,
                                    };
                                    navigate("/check_out", { state: { product: updateCartProduct} })}
                                    else console.log("empty color and empty size");
                                    }}>
                                MUA NGAY
                            </button>
                        </div>

                    </div>
                </div>
                {/* Thông tin mô tả */}
                <div className='w-9/12 mt-14 font-medium '>
                
                    {DetailProduct.description.split('\n').map((line, index) => (
                        <React.Fragment key={index} >
                        {line}
                        <br />
                        </React.Fragment>
                    ))}
                        
                </div>

                {/* Sản phẩm tương tự */}
                <div className='w-10/12 mt-24'>
                    <div className='text-center text-[#a91d3a] text-5xl font-semibold'>SẢN PHẨM TƯƠNG TỰ</div>                    
                </div>
                {/* Danh sách các sản phẩm tương tự */}
                <div className='w-full flex flex-row justify-center'>                       
                        <button className=" p-1 pr-2 bg-opacity-30 rounded-full "
                            onClick={hanlderBack}
                        >
                            <img src={back} alt="none"/>
                        </button>                        
                        <div className='w-10/12 mt-6'>
                            <div className='grid grid-cols-4 gap-10'>
                                {products.filter((product) => product.proId != proId).slice(NumberBack,NumberForward).map((product, index) => (
                                    <Product key={index} proId={product.proId} img={product.productImage.find(img => img.isPrimary)?.image} name={product.productName} price={product.cost} sale={product.discount}/>                            
                                ))}                      
                            </div>
                        </div>
                        <button  className=" p-1 pr-2 bg-white bg-opacity-30 rounded-full "
                            onClick={hanlderForward}
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
    )
}

export default DetailProduct