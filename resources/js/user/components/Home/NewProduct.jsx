import React, { useEffect, useState } from 'react';
import Product from '../../components/Product';
import img_silder from '../../assets/img_slider2.svg';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons'
import TitleCategory from '../../components/Category/TitleCategory';
import img_loading from '../../assets/loading.gif'

const NewProduct = () => {
    // State để lưu danh sách sản phẩm
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
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
    //Giá trị của bộ lọc sắp xếp
    const [sort, setSort] = useState('Giá giảm dần');
    // Ẩn/hiện các giá trị của bộ lọc tìm kiếm
    const [isOpen, setOpen] = useState(false);

    //Hàm set giá trị cho bộ lọc
    const setValue = (value) => {
        setSort(value);
        setOpen(false);
    };

    return (
        <div  className='w-full h-full'>
            <Navigation />
            <div  className='mt-[90px] justify-items-center'>

                {/* Slide */}
                {
                    loading ? (
                        <div className='h-5'></div>
                    ): ( <img className='w-full' src={img_silder} alt="none" /> )
                }

                {/* Tiêu đề */}
                <TitleCategory cate={"Sản phẩm mới"}/>

                {/*Bộ lọc */}
                {
                    loading ? (
                        <div>
                            <img className='w-10 h-10 mt-10' src={img_loading} alt="loading" />
                        </div>
                    ): (
                        <div className='w-10/12 h-full mt-16'>                    
                            <div className='w-full h-8 justify-items-end '
                                onMouseLeave={()=>setOpen(false)} //ẩn các gái trị của bộ lọc 
                            >
                                <div  className='flex '>                            
                                    <button className='flex' 
                                            onClick={()=>setOpen(true)} //ẩn các gái trị của bộ lọc 
                                    >
                                    <div className='rounded rounded-r-none py-1  border border-r-0 border-gray-400 shadow w-28 text-black text-sm font-bold '>{sort}</div>
                                    <div className='h-full rounded rounded-l-none border border-gray-400 shadow px-1 pt-1 mr-3 '>
                                        <FontAwesomeIcon icon={faChevronDown}  />
                                    </div>
                                    </button>
                                </div>                     
                                { isOpen && (<ul className={ `relative w-[138px] border border-[#9f9f9f] bg-white rounded z-20  mt-[1px] mr-3  }`}
                                                onMouseLeave={()=>setOpen(false)} //hiện các giá trị của bộ lọc
                                            >
                                                <li className='pl-4 py-1 text-black leading-relaxed rounded-t hover:bg-gray-200'>
                                                <button 
                                                    onClick={() => setValue("Giá tăng dần")} //set giá trị bộ lọc khi nhấn
                                                > Giá tăng dần</button></li>
                                                <li className='pl-4 py-1 text-black hover:bg-gray-200 rounded-b leading-relaxed'>
                                                <button onClick={() => setValue("Giá giảm dần")} //set giá trị bộ lọc khi nhấn
                                                >Giá giảm dần</button></li>
                                            </ul>)

                                }
                            </div>            
                            {/* Danh sách các sản phẩm  */}
                            <div className="mt-10 grid grid-cols-4 gap-12 z-10">
                                {products.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted)).slice(0,10) // get top 10 new product
                                                .sort((a,b) => {  // set sort
                                                    if (sort === 'Giá giảm dần') {
                                                      return (b.cost - b.cost*b.discount/100) - (a.cost - a.cost*a.discount/100);
                                                    }
                                                    else if (sort == "Giá tăng dần") {
                                                      return (a.cost - a.cost*a.discount/100) - (b.cost - b.cost*b.discount/100);
                                                    }
                                                    else return (b.cost - b.cost*b.discount/100) - (a.cost - a.cost*a.discount/100);
                                                  }).map((product, index) => (
                                                    <Product key={index} 
                                                            price={product.cost} 
                                                            img={product.productImage.find(img => img.isPrimary)?.image} //choose the primary image to display
                                                            name={product.productName} 
                                                            sale={product.discount} />
                                ))} 
                            </div>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    );
};

export default NewProduct;
