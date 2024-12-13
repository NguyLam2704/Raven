import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import bg_login from "../asset/bg_login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
    // Khởi tạo các biến
    const [formData, setFormData] = useState({
        account: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isRemember, setRemember] = useState(false);

    // Nếu chưa đăng xuất thì tự động điền các thông tin
    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("admin"));
        setRemember(JSON.parse(localStorage.getItem("isRemember")));
        console.log(admin);
        if (admin) {
            setFormData({
                account: admin.account,
                password: admin.password,
            });
        }
    }, []);
    const hanldeRemember = () => {
        setRemember(!isRemember);
    };

    // Kiểm tra xác thực
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        const res = await fetch("/api/admin/auth/login", {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (data.errors) {
            setErrors(data.errors);
        } else {
            console.log("Đăng nhập thành công");
            const admin = data.admin;
            admin.account = formData.account;
            admin.password = formData.password;
            console.log(admin);

            // Lưu các giá trị trả về
            localStorage.setItem("admin", JSON.stringify(admin));
            localStorage.setItem("token", data.token);
            localStorage.setItem("isRemember", isRemember);
            // Điều hướng về trang chủ admin
            navigate("/home_admin");
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-login"
            style={{ backgroundImage: `url(${bg_login})` }}
        >
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="mt-2">
                <h1 className="mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold text-white text-center mb-3">
                    ADMIN DASHBOARD
                </h1>
            </div>
            <div
                className="
                        bg-white mobile:p-4 desktop:p-8 rounded-2xl shadow-lg  border-2 border-red
                        mobile:w-[350px] mobile:h-[400px]
                        ipad:w-[400px] ipad:h-[450px]
                        desktop:w-[500px] desktop:h-[550px]
                "
            >
                <h2
                    className="mobile:text-lg ipad:text-xl desktop:text-2xl font-bold text-center 
                                mobile:mb-1 mobile:mt-4
                                ipad:mb-2 ipad:mt-7
                                desktop:mb-4 desktop:mt-9
                "
                >
                    Đăng nhập
                </h2>
                {/* <p className="text-sm text-center mb-6 text-gray-600">
                    Đăng nhập tài khoản của bạn
                </p> */}

                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="username"
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className={`w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
                                ${
                                    errors.account ? "border-[#E60000]" : null
                                }    
                            `}
                            placeholder="Username"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    account: e.target.value,
                                })
                            }
                            defaultValue={formData.account}
                        />
                    </div>
                    {errors.account && (
                        <p className="mobile:mb-2 desktop:mb-6 absolute text-[12px] text-[#E60000]">
                            {errors.account}
                        </p>
                    )}
                    <div className="relative">
                        <label
                            className="block text-gray-700 mobile:mt-6 desktop:mt-8 mb-2"
                            htmlFor="password"
                        >
                            Mật khẩu:
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
                                    ${
                                        errors.password
                                            ? "border-[#E60000]"
                                            : null
                                    }
                                `}
                            placeholder="Password"
                            defaultValue={formData.password}
                            minLength={3}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />

                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 bottom-1 transform -translate-y-1/2 cursor-pointer"
                            color={showPassword ? "#3b82f6 " : "#c3c6d1"}
                        />
                    </div>
                    {errors.password && (
                        <p className="mobile:mb-2 desktop:mb-6 absolute text-[12px] text-[#E60000]">
                            {errors.password}
                        </p>
                    )}
                    <div className="flex mobile:mt-7 desktop:mt-8 items-center">
                        <input
                            type="checkbox"
                            checked={isRemember}
                            onChange={hanldeRemember}
                        />
                        <p className="text-left ml-2 text-gray-600">
                            Remember me
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 hover:shadow-md
                                outline-none ring-indigo-500/70 ring-offset-2 focus-visible:ring-2 active:scale-[0.98] 
                                transition"
                    >
                        Đăng nhập
                    </button>
                </form>

                <button
                    onClick={() => navigate("/forgotpass")}
                    className="text-[17px] font-bold underline text-center text-blue-800 mobile:mt-2 ipad:mt-6 desktop:mt-10 w-full mx-auto"
                >
                    Quên mật khẩu ?
                </button>
            </div>
        </div>
    );
};

export default Login;
