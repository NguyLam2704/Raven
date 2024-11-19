import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import bg_login from "../asset/bg_login.png";

const ForgotPass = () => {
    const [formData, setFormData] = useState({
        email: "",
    });
    const [isSent, setSent] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Lấy gmail và gửi gmail reset password
        const res = await fetch("/api/admin/auth/sendemail", {
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
            
        }

    };

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-login"
            style={{ backgroundImage: `url(${bg_login})` }}
        >
            <Helmet>
                <title>Quên mật khẩu</title>
            </Helmet>
            <div className="mt-2">
                <h1 className="text-[32px] font-bold text-white text-center mb-3">
                    ADMIN DASHBOARD
                </h1>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[500px] h-[450px] border-2 border-red">
                <h2 className="text-2xl font-medium text-center mb-4 mt-9">
                    Quên mật khẩu
                </h2>
                {isSent ? (
                    <p>Chúng tôi đã gửi mail lấy lại mật khẩu, hãy kiểm tra mail!</p>
                ) : (
                    <div>
                        <p className="text-sm text-center mb-6 text-gray-600">
                            Vui lòng nhập email để khôi phục mật khẩu.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 mb-2"
                                    htmlFor="email"
                                >
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Email"
                                    defaultValue={formData.email}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const trueValue = value.replace(
                                            /\s/g,
                                            ""
                                        );
                                        setFormData({
                                            email: trueValue
                                        });
                                    }}
                                />
                                {errors.account && (
                                    <p className=" text-[12px] text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
                            >
                                Lấy lại mật khẩu
                            </button>
                        </form>
                    </div>
                )}

                <button
                    onClick={() => navigate("/")}
                    className="text-[17px] font-bold text-center text-blue-800 mt-10 w-full mx-auto"
                >
                    Quay lại đăng nhập
                </button>
            </div>
        </div>
    );
};

export default ForgotPass;
