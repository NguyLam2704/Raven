import React, { useState, useEffect } from "react";
import TitleSearch from '../components/Search/Titile_Search';
import Navigation from "../components/Navigation";
import Product from "../components/Product";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowUp} from '@fortawesome/free-solid-svg-icons'
import Footer from "../components/Footer";
import img_loading from '../assets/loading.gif'
import { useLocation } from "react-router-dom";
//Trang tiềm kiếm

const Search = () => {
  
    //Giá trị của bộ lọc sắp xếp
    const [sort, setSort] = useState('Giá giảm dần');
    // Ẩn/hiện các giá trị của bộ lọc tìm kiếm
    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
    //Hàm set giá trị cho bộ lọc
    const setValue = (value) => {
      setSort(value);
      setOpen(false);
  };
    //Nhận giá trị từ thanh tìm kiếm
    const location = useLocation();
    const text = new URLSearchParams(location.search).get("query");
    
    // const {text} = useParams();
    // State lưu danh sách sản phẩm từ API
    const [products, setProducts] = useState([]);

    // State lưu danh sách sản phẩm đã lọc
    const [filteredProducts, setFilteredProducts] = useState([])

    console.log(filteredProducts);
    // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/v1/product?includeImage=true'); // Gọi API
        const data = await response.json(); // Chuyển đổi JSON
        setProducts(data.data || []); // Lưu danh sách sản phẩm vào state
        setFilteredProducts(data.data || []); // Hiển thị toàn bộ sản phẩm ban đầu
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false); // Kết thúc trạng thái tải
      }
    };
    fetchProducts();
  }, []);

    // Lọc sản phẩm khi từ khóa tìm kiếm thay đổi
    useEffect(() => {
      if (text) {
        const filtered = products.filter((product) =>
          product.productName.toLowerCase().includes(text.normalize('NFC').toLowerCase())
        );
        setFilteredProducts(filtered);
        setValue("Giá giảm dần")
      } else {
        setFilteredProducts(products);
      }
    }, [text, products]);

         const [showScrollToTop, setShowScrollToTop] = useState(false);
    
            // Theo dõi sự kiện scroll
        useEffect(() => {
            const handleScroll = () => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;
    
                // Hiển thị nút khi scroll gần đến cuối trang
                setShowScrollToTop(scrollTop > clientHeight);
            };
    
            window.addEventListener('scroll', handleScroll);
    
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);
    
            // Hàm lướt lên đầu trang
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

    return(
        <div className='w-full bg-white h-full font-Public'> 
            <Navigation/>

            {/* Tiêu đề */}
            <TitleSearch input={text}/>
            
            <div className=" justify-items-center mt-20">
            {filteredProducts.length > 0 ? (
              <div className="w-10/12">              
                {/* Bộ lọc */}
                <div className='w-full desktop:h-8 ipad:h-7 mobile:h-6 justify-items-end '
                      onMouseLeave={()=>setOpen(false)} //ẩn các giá trị bộ lọc
                >
                    <div className='flex  '>                            
                        <button className='flex mr-3'
                                onClick={()=>setOpen(true)} // hiện các giá trị bộ lọc
                        >
                          <div className='rounded rounded-r-none py-1  border border-r-0 border-gray-400 shadow desktop:w-28 ipad:w-24 mobile:w-20 text-black mobile:text-xs desktop:text-base ipad:text-sm font-medium '>{sort}</div>
                          <div className='h-full align-middle rounded rounded-l-none border border-gray-400 shadow px-1 mr-3 '>
                                    <FontAwesomeIcon className='desktop:h-4 ipad:h-3 mobile:h-2 desktop:mt-[7px] ipad:mt-[6px] mobile:mb-1' icon={faChevronDown}  />
                                </div>
                        </button>
                    </div>
                    { isOpen && (<ul className={ `relative desktop:w-[138px] ipad:w-[118px] mobile:w-[98px] border border-[#9f9f9f] bg-white rounded z-20 mobile:text-xs desktop:text-base ipad:text-sm  mt-[1px] mr-6 font-Public }`}>
                                        <li className='desktop:pl-3 ipad:pl-2 mobile:pl-1 py-1 text-black leading-relaxed rounded-t hover:bg-gray-200'><button onClick={() => setValue("Giá tăng dần")}>Giá tăng dần</button></li>
                                        <li className='desktop:pl-3 ipad:pl-2 mobile:pl-1 py-1 text-black hover:bg-gray-200 rounded-b leading-relaxed'><button onClick={() => setValue("Giá giảm dần")}>Giá giảm dần</button></li>
                                </ul>)
                    }

                </div>
                {/* Danh sách các sản phẩm */}
                <div className="mt-10 grid desktop:grid-cols-4 ipad:grid-cols-3 mobile:grid-cols-2 gap-12 z-10">
                  {
                    filteredProducts 
                    .sort((a,b) => {
                        if (sort === 'Giá giảm dần') {
                          return (b.cost - b.cost*b.discount/100) - (a.cost - a.cost*a.discount/100);
                        }
                        else if (sort == "Giá tăng dần") {
                          return (a.cost - a.cost*a.discount/100) - (b.cost - b.cost*b.discount/100);
                        }
                        else return (b.cost - b.cost*b.discount/100) - (a.cost - a.cost*a.discount/100);
                      }).map((product, index) => (
                      <Product
                        key={index}
                        proId={product.proId}
                        price={product.cost}
                        img={product.productImage.find(img => img.isPrimary)?.image}
                        name={product.productName}
                        sale={product.discount}
                      />
                    ))}
                </div>
                
              </div>
        
            ) : ( loading ? <img className="desKtop:w-20 desktop:h-20 ipad:w-16 ipad:h-16 mobile:h-14 mobile:w-14" src={img_loading}/> : <div className="desktop:text-xl ipad:text-lg mobile:text-base">Không tìm thấy sản phẩm nào phù hợp với yêu cầu</div>)}
              
            </div>
                      
            <Footer/>

                        {/* Nút Lên đầu trang */}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 p-3 bg-[#1E0342] text-white rounded-full shadow-lg hover:bg-blue-600"
                >
                     <FontAwesomeIcon icon={faArrowUp} color='white' className='h-6 w-6' />  
                </button>
            )}           
            
        </div>
    )
}

export default Search;