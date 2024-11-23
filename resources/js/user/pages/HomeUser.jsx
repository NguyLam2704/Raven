import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Line from '../components/Home/Line';
import img_product from '../assets/img_product.svg'
import back from '../assets/Back.svg'
import forward from '../assets/Forward.svg'
import SliderHome from '../components/Home/SliderHome';
import TitleMore from '../components/Home/TitleMore';
import { useNavigate } from 'react-router-dom';

// Trang chủ
const HomeUser = () => {
    // State để lưu danh sách sản phẩm
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Trạng thái lỗi

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

    // useEffect để gọi fetchProducts khi component được render
    useEffect(() => {
        fetchProducts();
    }, []); // [] đảm bảo chỉ gọi API một lần khi component mount

    const navigate = useNavigate() ; 

    return(
        <div className='w-full h-screen '>
             { loading ? ( <div></div>) : (<Navigation/>) }
            <main className=" mt-[90px] w-full">
                { loading ? ( <div></div>) : (<SliderHome/>) }
                {/* Các sản phẩm mới */}
                <div className=" w-full  justify-items-center mt-20 "> 
                    {/* Tiêu đề */}
                    <div className="h-1/5 w-10/12 ">
                        <TitleMore type={"SẢN PHẨM MỚI"} load={loading}/>
                    </div>
                    { loading ? (
                        <div></div>
                    ) : (
                        <div className='w-full flex flex-row justify-center'>                       
                            <button onClick={()=>hanlderNumber(number)} className=" p-1 pr-2 bg-opacity-30 rounded-full "
                            >
                                <img src={back} alt="none"/>
                            </button>                        
                            <div className="h-4/5 w-10/12 grid grid-cols-4 gap-10 "  >                             
                                {products.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted)) // sort by day
                                        .slice(0, 8) // choose 8 product
                                        .map((product, index) => (
                                            <Product key={index} 
                                                    price={product.cost} 
                                                    img={product.productImage.find(img => img.isPrimary)?.image} //choose the primary image to display
                                                    name={product.productName} 
                                                    sale={product.discount} />
                                        ))}                       
                            </div>
                            <button className=" p-1 pr-2 bg-white bg-opacity-30 rounded-full ">
                                    <img  src={forward} alt="none"/>
                            </button>
                        </div>
                    )}     
                </div>

                { loading ? ( <div></div>) : (<Line/>) }                

                {/* Các sản phẩm nổi bật */}
                <div className="  w-full  justify-items-center mt-20"> 
                    {/* Tiêu đề */}
                    <div className="h-1/5 w-10/12 ">
                        <TitleMore type={"SẢN PHẨM NỔI BẬT"}  load={loading}/>
                    </div>

                    {/* Danh sách sản phẩm */}
                    { loading ? (
                        <div></div>
                    ) : (
                        <div className='w-full flex flex-row justify-center'>                       
                            <button className=" p-1 pr-2 bg-opacity-30 rounded-full ">
                                <img src={back} alt="none"/>
                            </button>                        
                            <div className="h-4/5 w-10/12 grid grid-cols-4 gap-10 "  > 
                                
                                {products.filter((product) => product.quantitySold > 10) //fiter product have more 10 quantitySold
                                        .slice(0, 8) //choose 8 product
                                        .map((product, index) => (
                                            <Product key={index}
                                                    price={product.cost} 
                                                    img={product.productImage.find(img => img.isPrimary)?.image} //choose the primary image to display
                                                    name={product.productName} 
                                                    sale={product.discount} />
                                        ))}
                                
                            </div>
                            <button className=" p-1 pr-2 bg-white bg-opacity-30 rounded-full ">
                                    <img  src={forward} alt="none"/>
                            </button>
                        </div>   
                    )} 
                                                     
                </div>   

                { loading ? ( <div></div>) : (<Line/>) }

                {/* Các sản phẩm sale */}
                <div className=" w-full  justify-items-center mt-20"> 
                    {/* Tiêu đề */}
                    <div className="h-1/5 w-10/12 ">
                        <TitleMore type={"SALE"}  load={loading}/>
                    </div>

                    {/* Danh sách sản phẩm */}
                    { loading ? (
                        <div></div>
                    ) : (
                        <div className='w-full flex flex-row justify-center'>                       
                            <button className=" p-1 pr-2 bg-opacity-30 rounded-full ">
                                <img src={back} alt="none"/>
                            </button>                        
                            <div className="h-4/5 w-10/12 grid grid-cols-4 gap-10 "  > 
                                
                                {products.filter((product) => product.discount > 0) //filter product have discount
                                    .slice(0, 8)
                                    .map((product, index) => (
                                        <Product  key={index}
                                                price={product.cost} 
                                                img={product.productImage.find(img => img.isPrimary)?.image} 
                                                name={product.productName} 
                                                sale={product.discount} />
                                    ))}
                                
                            </div>
                            <button className=" p-1 pr-2 bg-white bg-opacity-30 rounded-full ">
                                    <img  src={forward} alt="none"/>
                            </button>
                        </div> 
                    )} 
                                                          
                </div>                    
            </main>
            <Footer/>
            
        </div>
    )
}

export default HomeUser