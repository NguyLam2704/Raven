import React from 'react';
import Product from '../components/Product';
import Title from '../components/Home/Title_More';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Line from '../components/Home/Line';
import img_product from '../assets/img_product.svg'
import back from '../assets/Back.svg'
import forward from '../assets/Forward.svg'
import SliderHome from '../components/Home/SliderHome';

const HomeUser = () => {
    const ListProduct = [
        {
          key: 1,
          name: "Cao Quốc Kiệt",
          price: "1000000",
          img: img_product,
          sale: 0,
        },
        {
            key: 2,
            name: "Cao Quốc Kiệt",
            price: "1000000",
            img: img_product,
            sale: 0,
          },
          {
            key: 3,
            name: "Cao Quốc Kiệt",
            price: "1000000",
            img: img_product,
            sale: 0,
          },
          {
            key: 4,
            name: "Cao Quốc Kiệt",
            price: "1000000",
            img: img_product,
            sale: 70,
          },
          {
            key: 5,
            name: "Cao Quốc Kiệt",
            price: "1000000",
            img: img_product,
            sale: 0,
          },
          {
            key: 6,
            name: "Cao Quốc Kiệt",
            price: "1000000",
            img: img_product,
            sale: 30,
          },
          {
            key: 7,
            name: "Cao Quốc Kiệt",
            price: "1000000",
            img: img_product,
            sale: 40,
          },
          {
            key: 7,
            name: "Cao Quốc Kiệt",
            price: "1000000",
            img: img_product,
            sale: 0,
          },

      ];
    return(
        <div className='w-full h-screen'>
            <Navigation />
            <div class=" mt-[90px] w-full">
                <SliderHome/>
                <div class=" relative w-full h-[900px]  justify-items-center ">
                    <div class="h-1/5 w-10/12 ">
                        <Title type={"SẢN PHẨM MỚI"}/>
                    </div>
                    <div class="h-4/5 w-10/12 grid grid-cols-4 gap-10 "  >
                        {ListProduct.map((product) => (
                            <Product  price={product.price} img={product.img} name={product.name} />
                        ))}
                    </div>
                    <div class=" absolute justify-center justify-items-center h-full w-full top-0 left-0">
                        <div class="  w-full h-1/5"></div>
                        <div class="  h-4/5 mx-10 w-11/12 flex justify-between">
                            <button class=" p-1 pr-[6px] bg-opacity-30 rounded-full ">
                                <img src={back} alt="none"/>
                            </button>
                            <button class=" p-1 pr-[6px] bg-white bg-opacity-30 rounded-full ">
                                <img  src={forward} alt="none"/>
                            </button>
                        </div>
                    </div>                    
                </div>
                <Line></Line>
                <div class=" relative w-full h-[900px]  justify-items-center ">
                    <div class="h-1/5 w-10/12 ">
                        <Title type={"SẢN PHẨM NỔI BẬT"}/>
                    </div>
                    <div class="h-4/5 w-10/12 grid grid-cols-4 gap-10 ">
                        {ListProduct.map((product) => (
                            <Product  price={product.price} img={product.img} name={product.name} />
                        ))}
                    </div>
                    <div class=" absolute justify-center justify-items-center h-full w-full top-0 left-0">
                        <div class="  w-full h-1/5"></div>
                        <div class="  h-4/5 mx-10 w-11/12 flex justify-between">
                            <button class=" p-1 pr-[6px] bg-opacity-30 rounded-full ">
                                <img src={back} alt="none"/>
                            </button>
                            <button class=" p-1 pr-[6px] bg-white bg-opacity-30 rounded-full ">
                                <img  src={forward} alt="none"/>
                            </button>
                        </div>
                    </div>                    
                </div>
                <Line/>
                <div class=" relative w-full h-[900px]  justify-items-center ">
                    <div class="h-1/5 w-10/12 ">
                        <Title type={"SALE"}/>
                    </div>
                    <div class="h-4/5 w-10/12 grid grid-cols-4 gap-10 ">
                        {ListProduct.map((product) => (
                            <Product  price={product.price} img={product.img} name={product.name} />
                        ))}
                    </div>
                    <div class=" absolute justify-center justify-items-center h-full w-full top-0 left-0">
                        <div class="  w-full h-1/5"></div>
                        <div class="  h-4/5 mx-10 w-11/12 flex justify-between">
                            <button class=" p-1 pr-[6px] bg-opacity-30 rounded-full ">
                                <img src={back} alt="none"/>
                            </button>
                            <button class=" p-1 pr-[6px] bg-white bg-opacity-30 rounded-full ">
                                <img  src={forward} alt="none"/>
                            </button>
                        </div>
                    </div>                    
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default HomeUser