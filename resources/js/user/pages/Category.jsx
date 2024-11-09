import React, { useState } from 'react';
import Title_Cate from '../components/Category/Title_Cate';
import Product from '../components/Product';
import img_silder from '../assets/img_slider2.svg';
import Navigation from '../components/Navigation';
import img_product from '../assets/img_product.svg';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons'

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

const Category = ({ cate }) => {
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
                        {ListProduct.map((product) => (
                            <Product key={product.key} price={product.price} img={product.img} name={product.name} sale={product.sale} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Category;
