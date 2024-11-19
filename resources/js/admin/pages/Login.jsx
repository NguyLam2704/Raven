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

    // Nếu chưa đăng xuất thì tự động điền các thông tin
    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("admin"));
        console.log(admin);
        if (admin) {
            setFormData({
                account: admin.account,
                password: admin.password,
            });
        }
    }, []);

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
                <h1 className="text-[32px] font-bold text-white text-center mb-3">
                    ADMIN DASHBOARD
                </h1>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[500px] h-[550px] border-2 border-red">
                <h2 className="text-2xl font-medium text-center mb-4 mt-9">
                    Đăng nhập
                </h2>
                <p className="text-sm text-center mb-6 text-gray-600">
                    Vui lòng nhập email và password Admin đã được cung cấp
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="username"
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Username"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    account: e.target.value,
                                })
                            }
                            defaultValue={formData.account}
                        />
                        {errors.account && (
                            <p className=" text-[12px] text-red-500">
                                {errors.account}
                            </p>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="password"
                        >
                            Mật khẩu:
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                        {errors.password && (
                            <p className=" text-[12px] text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" />
                        <p className="text-left ml-2 text-gray-600">Remember me</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Đăng nhập
                    </button>
                </form>

                <button
                    onClick={() => navigate("/forgotpass")}
                    className="text-[17px] font-bold underline text-center text-blue-800 mt-10 w-full mx-auto"
                >
                    Quên mật khẩu ?
                </button>
            </div>
        </div>
    );
};

export default Login;
