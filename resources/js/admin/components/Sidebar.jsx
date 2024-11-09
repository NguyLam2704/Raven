import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faListCheck, faShapes, faUsers } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  return (
    <nav className="sidebar w-60 bg-white text-white flex flex-col p-5 fixed left-0 top-0 bottom-0 border-r border-gray-300">
      <h2 className="mb-7 text-2xl text-center text-black"><strong className="mb-7 text-2xl text-center text-blue-600">Raven</strong> Store</h2>
      <ul className="list-none p-0">
          <li className="mb-2">
            <Link to="/home_admin" className="text-black no-underline text-2xl p-2 block rounded font-bold hover:bg-blue-600 hover:text-white">
              <FontAwesomeIcon icon={faChartSimple} className='mr-2' />
              Tổng quan</Link>
          </li>
          <li className="mb-2">
            <Link to="/order_admin" className="text-black no-underline text-2xl p-2 block rounded font-bold hover:bg-blue-600 hover:text-white">
            <FontAwesomeIcon icon={faListCheck} className='mr-2' />
              Đơn hàng</Link>
          </li>
          <li className="relative mb-2">
            <button onClick={toggleProductMenu} className=" text-black text-2xl text-left p-2 block w-full rounded font-bold hover:bg-blue-600 hover:text-white">
            <FontAwesomeIcon icon={faShapes} className='mr-2' />
              Sản phẩm</button>
            <ul className={`dropdown-menu list-none pl-5 ${isProductMenuOpen ? 'block' : 'hidden'}`}>
              <li className="m-4"><a href="#" className="font-normal text-left block h-8 text-base text-black hover:bg-blue-600 hover:text-white">Sản phẩm hiện có</a></li>
              <li className="m-4"><a href="#" className="font-normal text-left block h-8 text-base text-black hover:bg-blue-600 hover:text-white">Thêm sản phẩm mới</a></li>
            </ul>
          </li>
          <li>
            <Link to="/customer_admin" className="text-black no-underline text-2xl p-2 flex rounded font-bold hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white">
            <FontAwesomeIcon icon={faUsers} size="sm" className='mr-2 pt-1' />
              Khách hàng</Link>
          </li>
        </ul>
    </nav>
  );
};

export default Sidebar;
