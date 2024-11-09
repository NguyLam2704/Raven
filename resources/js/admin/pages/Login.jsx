import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import bg_login from "../asset/bg_login.png"

const Login = () => {
    const [formData, setFormData] = useState({
        account: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('âss');
    

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
          console.log(data);
          localStorage.setItem("token",data.token);
          navigate('/home_admin');
        }

        
        //
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-login" 
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
                            value={formData.account}
                        />
                        {errors.account && <p className=" text-[12px] text-red-500">{errors.account[0]}</p>}
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="password"
                        >
                            Mật khẩu:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        {errors.password && <p className=" text-[12px] text-red-500">{errors.password[0]}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Đăng nhập
                    </button>
                </form>

                <button onClick={() => navigate('/forgotpass')} className="text-[17px] font-bold underline text-center text-blue-800 mt-10 w-full mx-auto">
                    Quên mật khẩu ?
                </button>
            </div>
        </div>
    );
};

export default Login;
