import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faListCheck, faShapes, faUsers, faCaretDown, faCaretUp, faBars } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  //Khởi tạo các biến trạng thái
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('/home_admin');
  const location = useLocation() //Lấy địa chỉ hiện tại đang trỏ đến

  useEffect(() => {
    setSelectedMenu(location.pathname); // Reload web khi URL thay đổi
     //đang ở trang sản phẩm hoặc thêm sản phẩm thì mở dropdown
    if (location.pathname === '/products_admin' || location.pathname === '/addproduct_admin') {
      setIsProductMenuOpen(true);
    }
  }, [location]);

  //Mở dropdown sản phẩm
  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  return (
      <nav className={`mobile:w-40 ipad:w-50 desktop:w-60 h-full bg-[#EEEEEE] text-white flex flex-col
              mobile:px-3 py-5 desktop:p-5 fixed left-0 top-0 bottom-0 border-r border-gray-300
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} desktop:translate-x-0 z-30`}
      >
        <div className="mobile:flex desktop:block items-center justify-between mb-7">
            <h2 className="mobile:text-lg ipad:text-xl desktop:text-2xl text-center text-[#1E0342]">
              <strong className="mobile:text-lg ipad:text-xl desktop:text-2xl text-[#1E0342]">Raven</strong> Store
            </h2>
            
            <button
              className="desktop:hidden text-[#1E0342] ml-1 self-end hover:text-[#31363F] transition-all duration-200"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        {/* Sidebar Content */}
        <ul className="list-none p-0 z-30">
            <li className="mb-2">
              <Link to="/home_admin" 
              className={`text-[#1E0342] no-underline mobile:text-base ipad:text-lg desktop:text-2xl 
                          mobile:p-1 ipad:p-1 desktop:p-2 block rounded font-bold
                          ${ selectedMenu === '/home_admin' ? "bg-[#0E46A3] text-white": "text-[#1E0342]"} 
                         hover:bg-[#1E0342] hover:text-white active:bg-[#9AC8CD] transition-all duration-200
                         active:scale-[0.98] hover:scale-[1.03] `}
                onClick={() => handleMenuClick('/home_admin')}  
              >
                <FontAwesomeIcon icon={faChartSimple} className='mr-2' />
                Tổng quan</Link>
            </li>
            <li className="mb-2">
              <Link to="/order_admin" 
              className={`text-[#1E0342] no-underline mobile:text-base ipad:text-lg desktop:text-2xl mobile:p-1 ipad:p-1 desktop:p-2 block rounded font-bold
              ${ selectedMenu === '/order_admin' ? "bg-[#0E46A3] text-white": "text-[#1E0342]"} 
                hover:bg-[#1E0342] hover:text-white active:bg-[#9AC8CD] transition-all duration-200 active:scale-[0.98] hover:scale-[1.03]`}
                onClick={() => handleMenuClick('/order_admin')}  
              >
              <FontAwesomeIcon icon={faListCheck} className='mr-2' />
                Đơn hàng</Link>
            </li>
            <li className="relative mb-2">
              <button onClick={toggleProductMenu} 
                className={`text-[#1E0342] text-left mobile:text-base ipad:text-lg desktop:text-2xl mobile:p-1 ipad:p-1 desktop:p-2  block w-full rounded font-bold 
                  hover:bg-[#1E0342] hover:text-white active:bg-[#9AC8CD] transition-all duration-200
                  ${isProductMenuOpen  ? "bg-[#0E46A3] text-white": "text-[#1E0342]"} active:scale-[0.98] hover:scale-[1.03]`}
                >
                <FontAwesomeIcon icon={faShapes} className='mr-2' />
                Sản phẩm
                {isProductMenuOpen ? <FontAwesomeIcon icon={faCaretUp} className='ml-2' size='xs'/> : <FontAwesomeIcon icon={faCaretDown} className='ml-2' size='xs'/>}
                
              </button>
              {/* <ul className={`dropdown-menu transition-transform duration-300 ease-in-out list-none mobile:pl-2 ipad:pl-2 desktop:pl-5 ${isProductMenuOpen ? 'block' : 'hidden'}`}>
                <li className='flex items-center mt-1 mobile:h-7 ipad:h-7 desktop:h-10 rounded-md hover:bg-[#31363F] active:bg-[#9AC8CD] transition-all duration-200'>
                  <Link to="/products_admin" 
                    className={`font-normal text-left px-2 items-center flex w-full h-full mobile:text-xs ipad:text-xs desktop:text-base text-[#1E0342]
                    ${ selectedMenu === '/products_admin' ? " text-[#31363F]": "text-[#1E0342]"} 
                  hover:text-white`}
                    onClick={() => handleMenuClick('/products_admin')}
                  >
                    Sản phẩm hiện có</Link>
                </li>
                <li className='flex items-center mt-1 mobile:h-7 ipad:h-7 desktop:h-10 rounded-md hover:bg-[#31363F] active:bg-[#9AC8CD] transition-all duration-200'>
                  <Link to="/addproduct_admin"  
                  className={`font-normal text-left px-2 items-center flex w-full h-full mobile:text-xs ipad:text-xs desktop:text-base text-[#1E0342]
                  ${ selectedMenu === '/addproduct_admin' ? " text-[#31363F]": "text-[#1E0342]"} 
                  hover:text-white`}
                    onClick={() => handleMenuClick('/addproduct_admin')}>
                    Thêm sản phẩm mới</Link>
                  </li>
              </ul> */}
              <ul className={`transition-all duration-300 ease-in-out overflow-hidden list-none mobile:pl-2 ipad:pl-2 desktop:pl-5 ${isProductMenuOpen ? 'max-h-40' : 'max-h-0'}`}>
                  <li className='flex items-center mt-1 mobile:h-7 ipad:h-7 desktop:h-10 rounded-md hover:bg-[#1E0342] active:bg-[#9AC8CD] transition-all duration-200'>
                    <Link to="/products_admin"
                      className={`font-normal text-left px-2 items-center flex w-full h-full mobile:text-xs ipad:text-xs desktop:text-base text-[#1E0342]
                      ${selectedMenu === '/products_admin' ? " text-[#0E46A3]" : "text-[#1E0342]"}
                      hover:text-white active:scale-[0.98] hover:scale-[1.03]`}
                      onClick={() => handleMenuClick('/products_admin')}
                    >
                      Sản phẩm hiện có
                    </Link>
                  </li>
                  <li className='flex items-center mt-1 mobile:h-7 ipad:h-7 desktop:h-10 rounded-md hover:bg-[#1E0342] active:bg-[#9AC8CD] transition-all duration-200'>
                    <Link to="/addproduct_admin"
                      className={`font-normal text-left px-2 items-center flex w-full h-full mobile:text-xs ipad:text-xs desktop:text-base text-[#1E0342]
                      ${selectedMenu === '/addproduct_admin' ? " text-[#0E46A3]" : "text-[#1E0342]"}
                      hover:text-white active:scale-[0.98] hover:scale-[1.03]`}
                      onClick={() => handleMenuClick('/addproduct_admin')}
                    >
                      Thêm sản phẩm mới
                    </Link>
                  </li>
              </ul>
            </li>
            <li>
              <Link to="/customer_admin" 
              className={`text-[#1E0342] no-underline mobile:text-base ipad:text-lg desktop:text-2xl mobile:p-1 ipad:p-1 desktop:p-2 block rounded font-bold
                ${ selectedMenu === '/customer_admin' ? "bg-[#0E46A3] text-white": "text-[#1E0342]"} 
                hover:bg-[#1E0342] hover:text-white active:bg-[#9AC8CD] transition-all duration-200 active:scale-[0.98] hover:scale-[1.03]`}
                onClick={() => handleMenuClick('/customer_admin')}  
              >
              <FontAwesomeIcon icon={faUsers} size="sm" className='mr-2 pt-1' />
                Khách hàng</Link>
            </li>
          </ul>
      </nav>
  );
};

export default Sidebar;
