import React from 'react';
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
   
    const navigate = useNavigate() ; 
    
    return(
        <div className='w-full h-screen '>
            <Navigation />

            <main class=" mt-[90px] w-full">
                <SliderHome/>

                {/* Các sản phẩm mới */}
                <div class=" relative w-full h-[900px]  justify-items-center "> 
                    {/* Tiêu đề */}
                    <div class="h-1/5 w-10/12 ">
                        <TitleMore type={"SẢN PHẨM MỚI"}/>
                    </div>
                    {/* Danh sách sản phẩm */}
                    <div className='w-full flex flex-row justify-center'>                       
                        <button class=" p-1 pr-2 bg-opacity-30 rounded-full ">
                            <img src={back} alt="none"/>
                        </button>                        
                        <div class="h-4/5 w-10/12 grid grid-cols-4 gap-10 "  > 
                            
                            {ListProduct.map((product) => (
                                <Product price={product.price} img={product.img} name={product.name} sale={product.sale} />                            
                            ))}
                            
                        </div>
                        <button class=" p-1 pr-2 bg-white bg-opacity-30 rounded-full ">
                                <img  src={forward} alt="none"/>
                        </button>
                    </div>                                       
                </div>

                <Line></Line>

                {/* Các sản phẩm nổi bật */}
                <div class=" relative w-full h-[900px]  justify-items-center "> 
                    {/* Tiêu đề */}
                    <div class="h-1/5 w-10/12 ">
                        <TitleMore type={"SẢN PHẨM NỔI BẬT"}/>
                    </div>
                    {/* Danh sách sản phẩm */}
                    <div className='w-full flex flex-row justify-center'>                       
                        <button class=" p-1 pr-2 bg-opacity-30 rounded-full ">
                            <img src={back} alt="none"/>
                        </button>                        
                        <div class="h-4/5 w-10/12 grid grid-cols-4 gap-10 "  > 
                            
                            {ListProduct.map((product) => (
                                <Product price={product.price} img={product.img} name={product.name} sale={product.sale} />                            
                            ))}
                            
                        </div>
                        <button class=" p-1 pr-2 bg-white bg-opacity-30 rounded-full ">
                                <img  src={forward} alt="none"/>
                        </button>
                    </div>                                       
                </div>
                
                <Line/>

                {/* Các sản phẩm sale */}
                <div class=" relative w-full h-[900px]  justify-items-center "> 
                    {/* Tiêu đề */}
                    <div class="h-1/5 w-10/12 ">
                        <TitleMore type={"SALE"}/>
                    </div>
                    {/* Danh sách sản phẩm */}
                    <div className='w-full flex flex-row justify-center'>                       
                        <button class=" p-1 pr-2 bg-opacity-30 rounded-full ">
                            <img src={back} alt="none"/>
                        </button>                        
                        <div class="h-4/5 w-10/12 grid grid-cols-4 gap-10 "  > 
                            
                            {ListProduct.map((product) => (
                                <Product price={product.price} img={product.img} name={product.name} sale={product.sale} />                            
                            ))}
                            
                        </div>
                        <button class=" p-1 pr-2 bg-white bg-opacity-30 rounded-full ">
                                <img  src={forward} alt="none"/>
                        </button>
                    </div>                                       
                </div>
            </main>
            <Footer/>
            
        </div>
    )
}

export default HomeUser