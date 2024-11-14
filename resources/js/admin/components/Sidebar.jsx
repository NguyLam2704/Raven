import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faListCheck, faShapes, faUsers, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('/home_admin');
  const location = useLocation()

  useEffect(() => {
    setSelectedMenu(location.pathname); // Cập nhật khi URL thay đổi
    if (location.pathname === '/products_admin' || location.pathname === '/addproduct_admin') {
      setIsProductMenuOpen(true);
    }
  }, [location]);

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  return (
    <nav className="sidebar w-60 bg-white text-white flex flex-col p-5 fixed left-0 top-0 bottom-0 border-r border-gray-300">
      <h2 className="mb-7 text-2xl text-center text-black"><strong className="mb-7 text-2xl text-center text-blue-600">Raven</strong> Store</h2>
      <ul className="list-none p-0">
          <li className="mb-2">
            <Link to="/home_admin" 
             className={`text-black no-underline text-2xl p-2 block rounded font-bold
             ${ selectedMenu === '/home_admin' ? "bg-blue-600 text-white": "text-black"} 
              hover:bg-blue-900 hover:text-white`}
              onClick={() => handleMenuClick('/home_admin')}  
            >
              <FontAwesomeIcon icon={faChartSimple} className='mr-2' />
              Tổng quan</Link>
          </li>
          <li className="mb-2">
            <Link to="/order_admin" 
             className={`text-black no-underline text-2xl p-2 block rounded font-bold
             ${ selectedMenu === '/order_admin' ? "bg-blue-600 text-white": "text-black"} 
              hover:bg-blue-900 hover:text-white`}
              onClick={() => handleMenuClick('/order_admin')}  
            >
            <FontAwesomeIcon icon={faListCheck} className='mr-2' />
              Đơn hàng</Link>
          </li>
          <li className="relative mb-2">
            <button onClick={toggleProductMenu} 
              className={`text-black text-2xl text-left p-2 block w-full rounded font-bold hover:bg-blue-900 hover:text-white
                ${isProductMenuOpen  ? "bg-blue-600 text-white": "text-black"}`}
              >
              <FontAwesomeIcon icon={faShapes} className='mr-2' />
              Sản phẩm
              {isProductMenuOpen ? <FontAwesomeIcon icon={faCaretUp} className='ml-2' size='xs'/> : <FontAwesomeIcon icon={faCaretDown} className='ml-2' size='xs'/>}
              
            </button>
            <ul className={`dropdown-menu list-none pl-5 ${isProductMenuOpen ? 'block' : 'hidden'}`}>
              <li className="m-4">
                <Link to="/products_admin" 
                  className={`font-normal text-left block h-6 text-base text-black
                  ${ selectedMenu === '/products_admin' ? " text-blue-600": "text-black"} 
                hover:bg-blue-900 hover:text-white`}
                  onClick={() => handleMenuClick('/products_admin')}
                >
                  Sản phẩm hiện có</Link>
              </li>
              <li className="m-4">
                <Link to="/addproduct_admin"  
                  className={`font-normal text-left block h-6 text-base text-black
                  ${ selectedMenu === '/addproduct_admin' ? " text-blue-600": "text-black"} 
                hover:bg-blue-900 hover:text-white`}
                  onClick={() => handleMenuClick('/addproduct_admin')}>
                  Thêm sản phẩm mới</Link>
                </li>
            </ul>
          </li>
          <li>
            <Link to="/customer_admin" 
             className={`text-black no-underline text-2xl p-2 block rounded font-bold
              ${ selectedMenu === '/customer_admin' ? "bg-blue-600 text-white": "text-black"} 
               hover:bg-blue-900 hover:text-white`}
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
