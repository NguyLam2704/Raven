import React from 'react';
import { useState, useEffect, useRef  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faUserGear, faKey, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = (e) =>{
    e.preventDefault();

    navigate('/')
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header bg-white fixed top-0 right-0 left-60 h-20 flex justify-between items-center p-5 border-b border-gray-300">
      <h1 className="text-4xl text-blue-600 text-center font-bold w-full z-10">ADMIN DASHBOARD</h1>
      <div className="user-info flex items-center w-1/6 absolute h-full right-5 z-20">
        <img
          src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
          alt="User Avatar"
          className="avatar w-16 h-16 rounded-full mr-2 border-2"
        />
        <div className="user-name flex flex-col items-start relative ">
          <span className="block text-lg">Luan dz</span>
          <span className="role text-xs text-gray-600">Admin</span>
        </div>
        <ul className={`user-dropdown absolute top-20 bg-white shadow-md list-none p-2 w-44 z-10 rounded-2xl border-2 ${isDropdownOpen ? 'block' : 'hidden'}`}>
            <li><Link to="/account_manage" className="p-2 text-sm text-gray-800 hover:bg-gray-200 block">
              <FontAwesomeIcon icon={faUserGear} style={{color: "#4e96ff",}} className='mr-2' />
                Quản lý tài khoản</Link>
            </li>

            <li><Link to="/change_password"  className="p-2 text-sm text-gray-800 hover:bg-gray-200 block">
              <FontAwesomeIcon icon={faKey} style={{color: "#f97fd9",}} className='mr-2'/>
                Thay đổi mật khẩu</Link>
            </li>

            <li>
              <form onSubmit={handleLogout} method="post">
                <button className="p-2 text-sm text-gray-800 hover:bg-gray-200 block w-full text-left">
                  <FontAwesomeIcon icon={faRightFromBracket} style={{color: "#ff8f8f",}} className='mr-2'/>
                  Đăng xuất
                </button>
              </form>
            </li>
        </ul>
          <div>
            <button type="button" 
                    className="dropdown-btn bg-none text-xs cursor-pointer ml-6 z-20 hover:text-blue-600"
                    onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faCircleChevronDown} />
            </button>
          </div>
      </div>
    </header>
  );
};

export default Header;
