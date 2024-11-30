import React, { useEffect, useState } from 'react';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BangSize from '../assets/bang_size.svg'
import img_loading from '../assets/loading.gif'

//Chi tiết sản phẩm
const DetailProduct = () =>{
    // get proid from url
    const {proId} = useParams();
    const [cartProduct, setcartProduct] = useState(null);
   
    //Kiểm soát hiển thị thnah giỏ hàng
    const [isCartMini, setCart] =useState(false)
    const handleCart = () => {
        // Lấy danh sách sản phẩm từ localStorage (nếu chưa có thì trả về mảng rỗng)
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const existingProductIndex = cart.findIndex((item) => item.proId === cartProduct.proId);

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã có, tăng số lượng
            cart[existingProductIndex].quantity += 1;
        } else {
            // Nếu sản phẩm chưa có, thêm sản phẩm với số lượng ban đầu là 1
            cart.push({ ...cartProduct, quantity: 1 });
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
    const [error, setError] = useState(null); // Trạng thái lỗi
    const fetchDetail = async() => {
        try {
            const response = await fetch(`/api/v1/product?proId[eq]=${proId}&includeProColorSize=true&includeImage=true`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json(); // Giả định API trả về JSON
            setDetailProduct(data.data[0]); // Lưu dữ liệu vào state
            if (data?.data?.[0]){
            const newcartProduct = {
                proId: data.data[0].proId,
                productName: data.data[0].productName,
                cost: data.data[0].cost,
                discount: data.data[0].discount,
                // quantity: "1",
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
    useEffect(() => {
        setLoading(true);
        fetchDetail();
    }, [proId])
    console.log(DetailProduct);
    const navigate = useNavigate()

    //Nhận giá trị số lượng sản phẩm
    const [quality, setQuality] = useState(1)
    //Nhận giá trị màu sắc
    const [selectedColor, setSelectedColor] = useState(null);   
    //nhận giá trị size 
    const [selectedSize, setSelectedSize] = useState(null);
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
                            <button >
                                <FontAwesomeIcon icon={faChevronUp} />
                            </button>
                            {DetailProduct.productImage.filter(image => !image.isPrimary).map((element,index) => {
                                return (
                                    <img 
                                        key = {index}
                                        className='h-[110px] w-[100px] rounded-md' src={element.image} alt="anh" />
                                )
                            })}
                            {/* <img className='h-[110px] w-[100px] rounded-md' src={img_product} alt="anh" />
                            <img className='h-[110px] w-[100px] rounded-md' src={img_product} alt="anh" />
                            <img className='h-[110px] w-[100px] rounded-md' src={img_product} alt="anh" /> */}
                            
                            <button>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </div>
                        {/* Hình ảnh chính */}
                        <div className='w-3/4 '>
                            <img className='h-[470px] ' src={DetailProduct.productImage.find(img => img.isPrimary)?.image} alt="anh" />
                        </div>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className='w-2/5 flex flex-col justify-between '>
                        {/* Tên sản phẩm */}
                        <div className='w-full content-center text-black text-3xl font-bold '>{DetailProduct.productName} </div>
                        {/* Giá sản phẩm */}
                        <div className='h-10 w-full flex flex-row border-b-2'>
                            <div className='h-10 content-center text-[#a91d3a] text-3xl font-bold '>{(DetailProduct.cost - (DetailProduct.cost* DetailProduct.discount / 100)).toLocaleString()}</div>
                            <div className='h-10 content-center text-[#9f9f9f] text-xl font-medium line-through ml-20'>{DetailProduct.cost.toLocaleString()}</div>
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
                                    
                                        return (
                                                <button 
                                                    key={index} 
                                                    onClick={() => setSelectedColor(element.color.colorCode)} 
                                                    className={`h-8 w-8 rounded-md mr-5 ${selectedColor === element.color.colorCode ? 'ring-[#c73659] ring-2' : 'ring-[#EEEEEE] ring-1'} `} 
                                                    style={{ backgroundColor: element.color.colorCode }} 
                                                />
                                           
                                
                                    )
                                })}
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
                                        console.log(element.size.sizeCode);
                                        return (
                                        <button 
                                            key = {index} 
                                            onClick={()=>setSelectedSize(element.size.sizeCode)}                                           
                                            className={`h-8 w-8 content-center text-center text-xl  mr-5 ${selectedSize === element.size.sizeCode ? 'text-[#c73659] border-[#c73659] border-2 font-bold' : 'text-black border border-black font-medium'} `}>
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
                <div className='w-9/12 mt-14'>
                    {DetailProduct.description.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                        {line}
                        <br />
                        </React.Fragment>
                    ))}
                </div>

                {/* Sản phẩm tương tự */}
                <div className='w-10/12 mt-24'>
                    <div className='text-center text-[#a91d3a] text-[56px] font-semibold'>SẢN PHẨM TƯƠNG TỰ</div>                    
                </div>
                {/* Danh sách các sản phẩm tương tự */}
                <div className='w-full flex flex-row justify-center'>                       
                        <button className=" p-1 pr-2 bg-opacity-30 rounded-full ">
                            <img src={back} alt="none"/>
                        </button>                        
                        <div className='w-10/12 mt-6'>
                            <div className='grid grid-cols-4 gap-10'>
                                {ListProduct.map((product, index) => (
                                    <Product key={index} img={product.img} name={product.name} price={product.price} sale={product.sale}/>                            
                                ))}                      
                            </div>
                        </div>
                        <button  className=" p-1 pr-2 bg-white bg-opacity-30 rounded-full ">
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