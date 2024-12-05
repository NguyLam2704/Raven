import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleChevronDown,
    faUserGear,
    faKey,
    faRightFromBracket,
    faBars
} from "@fortawesome/free-solid-svg-icons";
import ConQua from "../asset/ConQua.png"

const Header = ({toggleSidebar}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const token = "Bearer " + localStorage.getItem("token");
    const admin = JSON.parse(localStorage.getItem("admin"));

    //Bật hoặc tắt popup quản lý tài khoản,...
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); 
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("Logout pressed");

        // Xoá các token trên database
        const res = await fetch("/api/admin/auth/logout", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        const r = await res.json();
        if (r.errors) {
            console.log(r.errors);
        } else {
            console.log(r.message);
        }

        // Xoá token và admin lưu trong localstorage
        localStorage.removeItem("token");
        localStorage.removeItem("admin");


        // Điều hướng về trang login
        navigate("/login_admin");
    };


    //Click ra ngoài sẽ đóng popup quản lý tài khoản, thay đổi mật khẩu, đăng xuất
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className={`header z-100 mobile:w-full ipad:w-full desktop:w-auto bg-white fixed top-0 right-0 mobile:h-12 ipad:h-17 desktop:h-20 flex justify-between items-center desktop:p-0 p-5 border-b border-gray-300
            desktop:left-60    
        `}>
 
            <img src="https://tpuxfltiiajorbixwyff.supabase.co/storage/v1/object/public/Image/Logo/left.png?t=2024-12-05T04%3A52%3A47.750Z"  
                    alt="tree left"
                    className="mobile:hidden desktop:block h-20 left-0 absolute z-10"
            />

            <img 
                    src="https://tpuxfltiiajorbixwyff.supabase.co/storage/v1/object/public/Image/Logo/ConQua.png"
                    alt="qua trái"
                    className="mobile:hidden desktop:block h-20 left-[120px] absolute z-10"
            />

            <img src="https://tpuxfltiiajorbixwyff.supabase.co/storage/v1/object/public/Image/Logo/right.png?t=2024-12-05T04%3A57%3A45.652Z"  
                    alt="tree right"
                    className="desktop:hidden h-20 right-0 absolute z-10"
            />

            <img src="https://tpuxfltiiajorbixwyff.supabase.co/storage/v1/object/public/Image/Logo/ConQua_right.png?t=2024-12-05T05%3A29%3A44.868Z"  
                    alt="qua phải"
                    className="mobile:hidden ipad:block desktop:hidden h-20 right-[120px] absolute z-10"
            />

            <button className={`desktop:hidden mr-4 absolute z-50 ml-0`} onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
            </button>     
            
            <h1 className="
                desktop:text-4xl text-[#C73659] text-center font-bold w-full z-10
                ipad:text-2xl
                mobile:text-xl
            ">
                ADMIN DASHBOARD
            </h1>
            <div className="mobile:w-auto ipad:w-auto desktop:w-[250px] 
                    flex items-center absolute h-full right-2 z-20
            ">
                <img
                    src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                    alt="User Avatar"
                    onClick={toggleDropdown}
                    className="desktop:w-16 desktop:h-16 
                                ipad:w-10 ipad:h-10
                                mobile:w-8 mobile:h-8
                    rounded-full mr-2 border-2"
                />
                <div className="mobile:hidden ipad:hidden desktop:block flex flex-col items-start relative w-[100px] ">
                    <p className="block text-lg truncate w-[100px] text-[#C73659] font-bold">{admin.name}</p>
                    <p className="role text-xs text-gray-600">Admin</p>
                </div>
                <ul
                    ref={dropdownRef}
                    className={`
                        mobile:top-12 mobile:right-0
                        ipad:top-17 ipad:right-0
                        desktop:top-20 desktop:right-10
                        absolute  bg-white shadow-md list-none p-2 w-44 z-10 rounded-2xl border-2 ${
                        isDropdownOpen ? "block" : "hidden"
                    }`}
                >
                    <li>
                        <Link
                            to="/account_manage"
                            className="p-2 text-sm text-gray-800 hover:bg-gray-200 block"
                        >
                            <FontAwesomeIcon
                                icon={faUserGear}
                                style={{ color: "#4e96ff" }}
                                className="mr-2"
                            />
                            Quản lý tài khoản
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/change_password"
                            className="p-2 text-sm text-gray-800 hover:bg-gray-200 block"
                        >
                            <FontAwesomeIcon
                                icon={faKey}
                                style={{ color: "#f97fd9" }}
                                className="mr-2"
                            />
                            Thay đổi mật khẩu
                        </Link>
                    </li>

                    <li>
                        <form onSubmit={handleLogout} method="post">
                            <button className="p-2 text-sm text-gray-800 hover:bg-gray-200 block w-full text-left">
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    style={{ color: "#ff8f8f" }}
                                    className="mr-2"
                                />
                                Đăng xuất
                            </button>
                        </form>
                    </li>
                </ul>
                <div>
                    <button
                        type="button"
                        className="mobile:hidden ipad:hidden desktop:block bg-none text-xs cursor-pointer ml-4 hover:text-[#C73659] focus:text-[#C73659] "
                        onClick={toggleDropdown}
                    >
                        <FontAwesomeIcon icon={faCircleChevronDown} size="xl" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;