import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import img_silder from '../assets/img_slider2.svg';
import Navigation from '../components/Navigation';
import img_product from '../assets/img_product.svg';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons'
import TitleCategory from '../components/Category/TitleCategory';
import img_loading from '../assets/loading.gif'

const mapCategory = new Map([
    ["Áo thun", 1],
    ["Áo polo", 2],
    ["Áo khoác", 3],
    ["Áo sweater", 4],
    ["Áo sơ mi", 5],
    ["Quần dài", 6],
    ["Quần ngắn", 7],
    ["Cặp", 8],
    ["Túi xách", 9],
    ["Ví", 10],
    ["Nón", 11,]
]
)

const Category = ({ cate }) => {
  // State để lưu danh sách sản phẩm
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  let id = mapCategory.get(cate); // map category with category_id
// Hàm fetch API
  const fetchProductCategories = async () => {
      try {
          const response = await fetch(`/api/v1/product?categoryTypeId[eq]=${id}&includeImage=true`);
          if (!response.ok) {
              throw new Error('Failed to fetch products');
          }
          const data = await response.json(); // Giả định API trả về JSON
          setProductCategories(data.data || []); // Lưu dữ liệu vào state
          
          
      } catch (err) {
          setError(err.message); // Lưu thông báo lỗi nếu xảy ra
      } finally {
          setLoading(false); // Kết thúc trạng thái tải
      }
  };

//   useEffect để gọi fetchProducts khi component được render
  useEffect(() => {
      setLoading(true);
      fetchProductCategories();}, [cate]); // [] call API when cate change

  // store product 
  const [mapProductCategories,setMapProductCategories ] = useState([])
  // function sort product 
  const sortProducts = (value) => {
    const ProductCategories = [...productCategories].sort((a,b) => {
      if (value === 'Giá giảm dần') {
        return (b.cost - b.cost*b.discount/100) - (a.cost - a.cost*a.discount/100);
      }
      else if (value == "Giá tăng dần") {
        return (a.cost - a.cost*a.discount/100) - (b.cost - b.cost*b.discount/100);
      }
      else return (b.cost - b.cost*b.discount/100) - (a.cost - a.cost*a.discount/100);
    }).map((productCategory, index) => (
      <Product  key={index}
                proId={productCategory.proId}
                price={productCategory.cost} 
                img={productCategory.productImage.find(img => img.isPrimary)?.image}  //choose the primary image to display
                name={productCategory.productName} 
                sale={productCategory.discount} />
  )); 
    setMapProductCategories(ProductCategories);
  }


    //Giá trị của bộ lọc sắp xếp
    const [sort, setSort] = useState('Giá giảm dần');
    // Ẩn/hiện các giá trị của bộ lọc tìm kiếm
    const [isOpen, setOpen] = useState(false);

    //Hàm set giá trị cho bộ lọc
    const handleSort = (value) => {
        setSort(value);
        setOpen(false);
        sortProducts(value); // sort product
    };

    useEffect(() => {
      if (productCategories.length > 0) {
          sortProducts(sort); // Sắp xếp ngay khi có dữ liệu hoặc khi sort thay đổi
      }}, [productCategories, sort]); // Call when sort and category change

    return (
        <div  className='w-full h-full font-Public bg-white'>
            <Navigation />
            <div  className='mt-[90px] bg-white justify-items-center'>

                {/* Slide */}
                {
                  loading ? (
                    <div className='h-5'></div>
                  ): (
                    <img className='w-full' src={img_silder} alt="none" />
                  )
                }

                {/* Tiêu đề */}
                <TitleCategory cate={cate}/>
                
                {/*Bộ lọc */}
                {
                  loading ? (
                    <div>
                      <img className='desktop:w-10 desktop:h-10 ipad:w-8 ipad:h-8 mobile:h-6 mobile:w-6 mt-10' src={img_loading} alt="loading" />
                    </div>
                  ) : (
                    <div className='w-10/12 h-full mt-16'>                    
                        <div className='w-full desktop:h-8 ipad:h-7 mobile:h-6 justify-items-end '
                            onMouseLeave={()=>setOpen(false)} //ẩn các gái trị của bộ lọc 
                        >
                            <div  className='flex '>                            
                                <button className='flex' 
                                        onClick={()=>setOpen(true)} //ẩn các gái trị của bộ lọc 
                                >
                                  <div className='rounded rounded-r-none py-1  border border-r-0 border-gray-400 shadow desktop:w-28 ipad:w-24 mobile:w-20 text-black mobile:text-xs desktop:text-base ipad:text-sm font-medium '>{sort}</div>
                                  <div className='h-full align-middle rounded rounded-l-none border border-gray-400 shadow px-1 mr-3 '>
                                    <FontAwesomeIcon className='desktop:h-4 ipad:h-3 mobile:h-2 desktop:mt-[7px] ipad:mt-[6px] mobile:mb-1' icon={faChevronDown}  />
                                  </div>
                                </button>
                            </div>                     
                            { isOpen && (<ul className={ `relative desktop:w-[138px] ipad:w-[118px] mobile:w-[102px] border border-[#9f9f9f] bg-white rounded z-20 mobile:text-xs desktop:text-base ipad:text-sm  mt-[1px] mr-3 font-Public }`}
                                            onMouseLeave={()=>setOpen(false)} //hiện các giá trị của bộ lọc
                                        >
                                            <li className='desktop:pl-3 ipad:pl-2 mobile:pl-1 py-1 text-black leading-relaxed rounded-t hover:bg-gray-200 font-Public'>
                                              <button 
                                                onClick={() => handleSort("Giá tăng dần")} //set giá trị bộ lọc khi nhấn
                                              > Giá tăng dần</button></li>
                                            <li className='desktop:pl-3 ipad:pl-2 mobile:pl-1 py-1 text-black hover:bg-gray-200 rounded-b leading-relaxed font-Public'>
                                              <button onClick={() => handleSort("Giá giảm dần")} //set giá trị bộ lọc khi nhấn
                                            >Giá giảm dần</button></li>
                                        </ul>)

                            }
                        </div>            
                        {/* Danh sách các sản phẩm  */}
                        <div className="mt-10 grid desktop:grid-cols-4 ipad:grid-cols-3 mobile:grid-cols-2 justify-items-center justify-around gap-10  z-10">
                            {mapProductCategories}
                        </div>
                    </div>
                  )
                }
            </div>
            <Footer />
        </div>
    );
};

export default Category;
