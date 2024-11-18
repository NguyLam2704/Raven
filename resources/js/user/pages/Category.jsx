import React, { useState } from 'react';
import Product from '../components/Product';
import img_silder from '../assets/img_slider2.svg';
import Navigation from '../components/Navigation';
import img_product from '../assets/img_product.svg';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons'
import TitleCategory from '../components/Category/TitleCategory';

const ListProduct = [
    {
      key: 1,
      name: "Cao Quốc Kiệt",
      price: 1000000,
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
      {
        key: 3,
        name: "Cao Quốc Kiệt",
        price: 1000000,
        img: img_product,
        sale: 0,
      },
      {
        key: 4,
        name: "Cao Quốc Kiệt",
        price: 1000000,
        img: img_product,
        sale: 70,
      },
      {
        key: 5,
        name: "Cao Quốc Kiệt",
        price: 1000000,
        img: img_product,
        sale: 0,
      },
      {
        key: 6,
        name: "Cao Quốc Kiệt",
        price: 1000000,
        img: img_product,
        sale: 30,
      },
      {
        key: 7,
        name: "Cao Quốc Kiệt",
        price: 1000000,
        img: img_product,
        sale: 40,
      },
      {
        key: 7,
        name: "Cao Quốc Kiệt",
        price: 1000000,
        img: img_product,
        sale: 0,
      },

  ];
//Loại sản phẩm
const Category = ({ cate }) => {
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
                <img className='w-full' src={img_silder} alt="none" />

                {/* Tiêu đề */}
                <TitleCategory cate={cate}/>

                {/*Bộ lọc */}
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
                        {ListProduct.map((product) => (
                            <Product price={product.price} img={product.img} name={product.name} sale={product.sale} />
                        ))}
                </div>
              </div>
            </div>
            <Footer />
        </div>
    );
};

export default Category;
