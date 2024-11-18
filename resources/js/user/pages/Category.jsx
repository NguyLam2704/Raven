import React, { useEffect, useState } from 'react';
import Title_Cate from '../components/Category/Title_Cate';
import Product from '../components/Product';
import img_silder from '../assets/img_slider2.svg';
import Navigation from '../components/Navigation';
import img_product from '../assets/img_product.svg';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons'

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
  const [error, setError] = useState(null); // Trạng thái lỗi
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
      console.log(productCategories);

  const mapProductCategories = productCategories.map((productCategory) => (
      <Product  price={productCategory.cost} 
                img={productCategory.productImage.find(img => img.isPrimary)?.image}  //choose the primary image to display
                name={productCategory.productName} 
                sale={productCategory.discount} />
  )); 
    //---------------------------------------------------
    const [sort, setSort] = useState('Giá giảm dần');
    const [isOpen, setOpen] = useState(false);

    const setValue = (value) => {
        setSort(value);
        setOpen(false);
    };

    const MouseLeave = () => {
        setOpen(false);
    };
    const MouseEnter = () => {
        setOpen(true);
    };

    if (loading) {
      return <div>Loading...</div>;
  }
  
  if (error) {
      return <div>Error: {error}</div>;
  }

    return (
        <div  className='w-full h-full'>
            <Navigation />
            <div  className='mt-[90px] justify-items-center'>
                <img className='w-full' src={img_silder} alt="none" />
                <Title_Cate cate={cate} />
                <div className='w-10/12 h-full mt-16'>
                    
                        <div onMouseLeave={MouseLeave} className='w-full h-8 justify-items-end '>
                            <div  className='flex '>
                            
                                <button className='flex '  onClick={MouseEnter}>
                                  <div className='rounded rounded-r-none py-1  border border-r-0 border-gray-400 shadow w-28 text-black text-sm font-bold '>{sort}</div>
                                  <div className='rounded rounded-l-none border border-gray-400 shadow py-[2px] px-1 mr-3 '>
                                    <FontAwesomeIcon icon={faChevronDown}  />
                                  </div>
                                </button>
                            </div>                     
                            { isOpen && (<ul onMouseLeave={MouseLeave} className={ `relative w-[138px] border border-[#9f9f9f] bg-white rounded z-20   mt-[1px] mr-[12px]  }`}>
                                            <li className='pl-[10px] py-[4px] text-black leading-relaxed rounded-t hover:bg-gray-200'><button onClick={() => setValue("Giá tăng dần")}>Giá tăng dần</button></li>
                                            <li className='pl-[10px] py-[4px] text-black hover:bg-gray-200 rounded-b leading-relaxed'><button onClick={() => setValue("Giá giảm dần")}>Giá giảm dần</button></li>
                                        </ul>)

                            }
                        </div>            
              
                    <div className="mt-10 grid grid-cols-4 gap-12 z-10">
                        {mapProductCategories}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Category;
