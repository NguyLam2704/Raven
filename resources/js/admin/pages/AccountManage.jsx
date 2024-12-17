import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import NavigationAdmin from "../components/NavigationAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk, faBan} from '@fortawesome/free-solid-svg-icons'


const AccountManage = () => {
    // Lấy admin từ trong local storage
    const admin = JSON.parse(localStorage.getItem("admin"));
    const [name, setName] = useState(admin.name);
    const [email, setEmail] = useState(admin.email);
    const [phoneNum, setPhoneNum] = useState(admin.phoneNumber);
    const [errors, setErrors] = useState({});

    const token = "Bearer " + localStorage.getItem("token");
    const [isEditing, setIsEditing] = useState(false);

    //bật tắt edit
    const handleEditing = () => {
        if (!isEditing){
            setIsEditing(true);
            return;
        }
    }

    //Khi bấm hủy chỉnh sửa thì set giá trị ban đàu
    const setFalseEditing = () => {
        setIsEditing(false);
        setName(admin.name);
        setEmail(admin.email);
        setPhoneNum(admin.phoneNumber);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingSwal = Swal.fire({
            title: "Loading...!",
            text: "Đang cập nhật tài khoản.",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); // Hiển thị spinner loading
            },
        });

        //Dữ liệu không thay đổi thì không thực hiện hàm dưới...
        if (name == admin.name && email == admin.email && phoneNum == admin.phoneNumber){
            return;
        }


        // Tạo form đẩy dữ liệu lên DB
        const formData = {
            name: name,
            email: email,
            phoneNumber: phoneNum,
        };
        let id = admin.id;
        const res = await fetch("/api/admin/" + id, {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        // Handle lỗi
        const data = await res.json();
        if (data.errors) {
            setErrors(data.errors);
            Swal.fire({
                title: 'Cập nhật không thành công!',
                text: 'Thông tin tài khoản cập nhật không thành công.',
                icon: 'error',
                showConfirmButton: false,
                timer: 4000,
            });
        } else {
            // Lưu dữ liệu đã chỉnh sửa vào localstorage
            admin.name = name;
            admin.email = email;
            admin.phoneNumber = phoneNum;
            localStorage.setItem("admin", JSON.stringify(admin));
            setErrors({});
            setIsEditing(false);
            console.log(data);
            Swal.fire({
                title: 'Cập nhật thành công!',
                text: 'Thông tin tài khoản đã được cập nhật thành công.',
                icon: 'success',
                showConfirmButton: false,
                timer: 4000,
            });
        }
    };

    return (
        <NavigationAdmin>
            <Helmet>
                <title>Quản lý tài khoản</title>
            </Helmet>
            <div className="mt-2">
                <h1 className="mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold text-black text-left mb-6">
                    Quản lý tài khoản
                </h1>
            </div>
            <div className="bg-white mobile:p-2 ipad:p-8 rounded-lg shadow-lg w-full h-auto border-2 border-red items-center justify-center">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                        alt="User Avatar"
                        className="mobile:w-12 mobile:h-12  ipad:w-24 ipad:h-24 rounded-full mb-2 border-2"
                    />
                </div>

                <form
                    className="ipad:w-[60%] items-center justify-center mx-auto"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="name"
                        >   
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={!isEditing}
                        />
                        {errors.name && (
                            <p className=" text-[12px] text-red-500">
                                Tên không hợp lệ!
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={!isEditing}
                        />
                        {errors.email && (
                            <p className=" text-[12px] text-red-500">
                                Email không hợp lệ!
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="phone"
                        >
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={!isEditing}
                        />
                        {errors.phoneNumber && (
                            <p className=" text-[12px] text-red-500">
                                Số điện thoại không hợp lệ!
                            </p>
                        )}
                    </div>

                    {isEditing 
                    ? 
                        <div className="w-full flex justify-end">
                            <button
                                type="button"
                                onClick={setFalseEditing}
                                className={`w-[10rem] text-white my-6 py-2 rounded-md mr-4 justify-items-end 
                                    ${isEditing ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-700" }
                                    outline-none ring-indigo-500/70 ring-offset-2 focus-visible:ring-2 hover:scale-[1.03] active:scale-[0.98] `}
                            >
                                <FontAwesomeIcon icon={faBan} className="mr-2"/>
                                HỦY
                            </button>

                            <button
                                type="submit"
                                className={`w-[10rem] text-white my-6 py-2 rounded-md  justify-items-end 
                                    ${isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 hover:bg-gray-700" }
                                     outline-none ring-indigo-500/70 ring-offset-2 focus-visible:ring-2 hover:scale-[1.03] active:scale-[0.98]`}
                            >
                                <FontAwesomeIcon icon={faFloppyDisk} className="mr-2"/>
                                LƯU
                            </button>
                        </div>
                    : 
                        <div className="w-full flex justify-end">
                            <button
                                type="button"
                                onClick={handleEditing}
                                className={`w-[10rem] text-white my-6 py-2 rounded-md  justify-items-end 
                                    ${isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 hover:bg-gray-700" }
                                     outline-none ring-indigo-500/70 ring-offset-2 focus-visible:ring-2 hover:scale-[1.03] active:scale-[0.98]`}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className="mr-2"/>
                                CHỈNH SỬA
                            </button>
                        </div>                   
                    }

                </form>
            </div>
        </NavigationAdmin>
    );
};

export default AccountManage;
