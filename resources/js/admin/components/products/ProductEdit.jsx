import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SketchPicker } from "react-color";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ProductEdit = ({products, onClose}) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        prod_name: "",
        cost: null,
        discount: 0,
        description: "",
        pro_color_size: [],
        category_type_id: null,
        images: [
            { img: null, is_primary: true },
            { img: null, is_primary: false },
            { img: null, is_primary: false },
            { img: null, is_primary: false },
            { img: null, is_primary: false },
        ],
    });
    
    const [items, setItems] = useState([]); // mảng màu, size, số lượng
    const [newItem, setNewItem] = useState({
        color: "#FFFFFF", // Default color is white
        nameColor: "",
        size: "",
        quantity: "",
    });
    const [mainImage, setMainImage] = useState(null);
    const [otherImages, setOtherImages] = useState([]);
    const [currentMainImageUrl, setCurrentMainImageUrl] = useState(null);
    const [currentOtherImageUrls, setCurrentOtherImageUrls] = useState([null, null, null, null]);


    const [showModal, setShowModal] = useState(false);

    const modalFalse = () => setShowModal(false);

    useEffect(() => {
        const LoadData =  () => {
            setProduct(products)
            // Phân loại ảnh thành mainImage và otherImages
            const primaryImage = products.images.find((img) => img.is_primary);
            const nonPrimaryImages = products.images.filter((img) => !img.is_primary);

            // Cập nhật trạng thái
            setMainImage(primaryImage ? primaryImage.image : null);
            setOtherImages([...nonPrimaryImages.map((img) => img.image), null]);


            // Cập nhật URL hình ảnh cũ
            setCurrentMainImageUrl(primaryImage ? primaryImage.img : null);
            setCurrentOtherImageUrls(nonPrimaryImages.map((img) => img.img));

            if (products.pro_color_size && products.pro_color_size.length > 0) {
                const mappedItems = products.pro_color_size.map((item) => ({
                    color: item.color_code,
                    nameColor: item.color_name,
                    size: item.size_code,
                    quantity: item.quantity_available,
                }));
                setItems(mappedItems);
            }

            setShowModal(true);
            console.log(products.images[1])
        };
        LoadData();
        
    }, []); 

    const [showColorPicker, setShowColorPicker] = useState(false);

    const mainImageInputRef = useRef(null);
    const otherImageInputRefs = useRef([]);

    const colorPickerRef = useRef(null);
    const sizeOptionsRef = useRef(null);

    //Tắt lựa chọn màu và size nếu click ra ngoài bảng chọn
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                colorPickerRef.current &&
                !colorPickerRef.current.contains(event.target)
            ) {
                setShowColorPicker(false);
            }
            if (
                sizeOptionsRef.current &&
                !sizeOptionsRef.current.contains(event.target)
            ) {
                setShowSizeOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    //Thêm màu, size, số lượng mới vào mảng items
    const handleAddItem = () => {
        if (newItem.size && newItem.quantity) {
            setItems([...items, newItem]); // Add new item to the array
            setNewItem({
                color: "#FFFFFF",
                nameColor: "",
                size: "",
                quantity: "",
            }); // Reset inputs
        } else {
            alert("Please select a size and enter a quantity");
        }
    };

    //Xóa màu, size, số lượng
    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const categoryTypeMap = {
        "Áo thun": 1,
        "Áo polo": 2,
        "Áo khoác": 3,
        "Sweater": 4,
        "Áo sơ mi": 5,
        "Quần dài": 6,
        "Quần ngắn": 7,
        "Cặp": 8,
        "Túi xách": 9,
        "Ví": 10,
        "Nón": 11,
    };

    const getCategoryNameById = (id) => {
        return Object.keys(categoryTypeMap).find((key) => categoryTypeMap[key] === id) || "";
    };
    
    // Xử lý thay đổi phân loại
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setProduct({
            ...product,
            category_type_id: categoryTypeMap[selectedCategory],
        });
    };


    const [mainImageFile, setMainImageFile] = useState(null);
    const [otherImageFiles, setOtherImageFiles] = useState([
        null,
        null,
        null,
        null,
    ]);

    const handleMainImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file);
            setMainImage(previewUrl);
            setMainImageFile(file); // Lưu file tạm thời
        }
    };

    const handleOtherImageUpload = (event, index) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file);
            setOtherImages((prev) => {
                const newImages = [...prev];
                newImages[index] = previewUrl;
                return newImages;
            });
            setOtherImageFiles((prev) => {
                const newFiles = [...prev];
                newFiles[index] = file; // Lưu file tạm thời
                return newFiles;
            });
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Ngăn trình duyệt thực hiện hành vi mặc định khi kéo thả (ví dụ: mở tệp).
    };

    //Kéo thả hình ảnh ở hình ảnh chính
    const handleMainImageDrop = async (event) => {
        event.preventDefault(); // Ngăn hành vi mặc định của trình duyệt khi người dùng thả tệp vào phần tử (ví dụ: hiển thị tệp hoặc chuyển hướng).
        const file = event.dataTransfer.files[0]; // Lấy tệp đầu tiên từ sự kiện kéo thả (danh sách các tệp được thả).
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file);
            setMainImage(previewUrl);
            setMainImageFile(file); // Lưu file tạm thời
        }
    };

    //Kéo thả hình ảnh ở hình ảnh phụ
    const handleImageDrop = async (event, index) => {
        event.preventDefault(); // Ngăn hành vi mặc định của trình duyệt khi kéo và thả tệp.
        const file = event.dataTransfer.files[0]; // Lấy tệp đầu tiên được thả vào từ sự kiện kéo thả.
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file);
            setOtherImages((prev) => {
                const newImages = [...prev];
                newImages[index] = previewUrl;
                return newImages;
            });
            setOtherImageFiles((prev) => {
                const newFiles = [...prev];
                newFiles[index] = file; // Lưu file tạm thời
                return newFiles;
            });
        }
    };

    //Xóa hình ảnh chính
    const removeMainImage = () => setMainImage(null);

    //Xóa hình ảnh phụ
    const removeOtherImage = (index) => {
        const newImages = [...otherImages];
        newImages[index] = null;
        setOtherImages(newImages);
    };

    const handleSaveProduct = async () => {
        console.log(product.category_type_id)
        if (
            !product.prod_name ||
            !product.cost ||
            !items.length ||
            !product.category_type_id
        ) {
            alert("Vui lòng điền đầy đủ thông tin cần thiết!");
            return;
        }
    
        try {
            Swal.fire({
                title: "Loading...!",
                text: "Đang chỉnh sửa sản phẩm",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });
    
            let uploadedMainImageUrl = mainImage; // Mặc định giữ lại URL cũ
            const uploadedOtherImageUrls = [...otherImages]; // Mặc định giữ lại URL cũ
    
            // Upload main image nếu có thay đổi
            if (mainImageFile) {
                const timestamp = new Date()
                    .toISOString()
                    .replace(/[-:.]/g, "")
                    .slice(0, 15);
                const uniqueFileName = `main/${
                    mainImageFile.name.split(".")[0]
                }_${timestamp}.${mainImageFile.name.split(".").pop()}`;
                const { data, error } = await supabase.storage
                    .from("Image/ProductImage")
                    .upload(uniqueFileName, mainImageFile, {
                        cacheControl: "3600",
                        upsert: false,
                    });
    
                if (error) throw error;
                uploadedMainImageUrl = supabase.storage
                    .from("Image/ProductImage")
                    .getPublicUrl(data.path).data.publicUrl;
            }
    
            // Upload other images nếu có thay đổi
            for (let i = 0; i < otherImageFiles.length; i++) {
                const file = otherImageFiles[i];
                
                if (file) {
                    const timestamp = new Date()
                        .toISOString()
                        .replace(/[-:.]/g, "")
                        .slice(0, 15);
                    const uniqueFileName = `other/${
                        file.name.split(".")[0]
                    }_${timestamp}.${file.name.split(".").pop()}`;
                    const { data, error } = await supabase.storage
                        .from("Image/ProductImage")
                        .upload(uniqueFileName, file, {
                            cacheControl: "3600",
                            upsert: false,
                        });
    
                    if (error) throw error;
                    const publicUrl = supabase.storage
                        .from("Image/ProductImage")
                        .getPublicUrl(data.path).data.publicUrl;
                    uploadedOtherImageUrls[i] = publicUrl;
                } 
            }

    
            const updatedProduct = {
                ...product,
                pro_color_size: items.map((item) => ({
                    color_code: item.color,
                    color_name: item.nameColor,
                    size_code: item.size,
                    quantity_available: parseInt(item.quantity, 10),
                })),
                images: [
                    { img: uploadedMainImageUrl, is_primary: true },
                    ...uploadedOtherImageUrls.filter(url => url != null).map((url, index) =>({
                        img: url,
                        is_primary: false,
                    })),
                ],
            };

            
            console.log("Product saved:", updatedProduct);
            // Gửi dữ liệu sản phẩm lên server hoặc database
            await axios.put(`api/dashboard/product/${updatedProduct.prod_id}`, updatedProduct);
    
            Swal.fire({
                title: "Thành công!",
                text: "Sản phẩm đã được cập nhật",
                icon: "success",
                showConfirmButton: false,
                timer: 4000,
            });
            onClose();
        } catch (error) {
            console.error("Upload error:", error);
            Swal.fire({
                title: "Lỗi!",
                text: "Đã xảy ra lỗi khi chỉnh sửa sản phẩm!",
                icon: "error",
                showConfirmButton: true,
                timer: 2000,
            });
        }
    };
    
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'} z-10`}>
            <div className="p-4 border-3 h-[90%] w-[90%] overflow-x-hidden bg-white rounded-lg px-10 border-[#0E46A3]">
                <div className="items-center rounded-tl-lg rounded-tr-lg flex w-full desktop:h-12 justify-center bg-[#1E0342]">
                    <h2 className='mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold text-white'>Chỉnh sửa sản phẩm </h2>
                </div>
                <div className="desktop:flex px-5 border-2 border-[#0E46A3] w-full">
                    {/* Cột trái */}
                    <div className="desktop:w-[70%] desktop:mr-12">
                        <div className="mb-4">
                            <label className="block font-semibold mb-1 mobile:text-lg ipad:text-xl desktop:text-2xl">Tên sản phẩm<span className="text-red-600">*</span></label>
                            <input 
                                type="text" 
                                placeholder="Nhập tên sản phẩm" 
                                value={product.prod_name}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        prod_name: e.target.value,
                                    })
                                }
                                className="w-full h-[50px] border rounded border-black px-3 py-2"
                            />
                        </div>

                        <div className="ipad:mb-4 ipad:grid ipad:grid-cols-2 ipad:gap-4">
                            <div>
                                <label className="block font-semibold mb-1 mobile:text-lg ipad:text-xl desktop:text-2xl">Giá<span className="text-red-600">*</span></label>
                                <input 
                                    type="number" 
                                    placeholder="Nhập giá cho sản phẩm" 
                                    value={product.cost || ""}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            cost: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full h-[50px] border border-black rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mobile:mt-4 ipad:mt-0 ipad:mb-1 mobile:text-lg ipad:text-xl desktop:text-2xl">Sale</label>
                                <input 
                                    type="number" 
                                    placeholder="Nhập sale" 
                                    value={product.discount || ""}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            discount: parseFloat(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    className="w-full h-[50px] border border-black rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        <table className="min-w-full my-6 border-collapse border border-black">
                            <thead>
                            <tr>
                                <th className="border border-black p-2 w-1/5 mobile:text-base ipad:text-2xl font-semibold">Màu sắc</th>
                                <th className="border border-black p-2 w-1/5 mobile:text-base ipad:text-2xl font-semibold">Tên màu</th>
                                <th className="border border-black p-2 w-1/5 mobile:text-base ipad:text-2xl font-semibold">Size</th>
                                <th className="border border-black p-2 w-1/5 mobile:text-base ipad:text-2xl font-semibold">Số lượng</th>
                                <th className="border border-black p-2 w-1/5 mobile:text-base ipad:text-2xl font-semibold">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="border border-black">
                                <td className="p-2 text-center flex justify-center items-center mt-1">
                                    <div
                                    style={{ backgroundColor: item.color, width: '24px', height: '24px', borderWidth: 1 }}
                                    ></div>
                                </td>
                                <td className=" border border-black p-2 text-center mobile:text-base ipad:text-2xl font-normal">{item.nameColor}</td>
                                <td className=" border border-black p-2 text-center mobile:text-base ipad:text-2xl font-normal">{item.size}</td>
                                <td className=" border border-black p-2 text-center mobile:text-base ipad:text-2xl font-normal">{item.quantity}</td>
                                <td className="border border-black p-2 items-center mobile:text-base justify-center text-center">
                                    <button
                                    onClick={() => handleDeleteItem(index)}
                                    className="bg-red-500 text-white mobile:p-1 ipad:p-2 border-2 rounded"
                                    >
                                    Xóa
                                    </button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>


                        <div className="mobile:text-lg ipad:text-xl desktop:text-2xl font-semibold">Nhập màu, size và số lượng<span className="text-red-600">*</span></div>
                        <div className="border border-black mb-2">
                            <div className="mb-4 mt-2 ipad:flex items-center px-2 py-1 gap-3">
                                <div className="flex-row w-[50%]">
                                    <div className="relative z-0">
                                        <label className="block mobile:text-lg ipad:text-xl desktop:text-2xl font-normal">Color</label>
                                        <div
                                            className="w-8 h-8 border border-black rounded cursor-pointer"
                                            style={{
                                                backgroundColor: newItem.color,
                                            }}
                                            onClick={() =>
                                                setShowColorPicker(
                                                    !showColorPicker
                                                )
                                            }
                                        ></div>
                                        {showColorPicker && (
                                            <div
                                                ref={colorPickerRef}
                                                className="absolute left-0 mt-2 p-2 border bg-[#245ee0] border-gray-300 rounded shadow-lg z-0"
                                            >
                                                <SketchPicker
                                                    color={newItem.color}
                                                    onChangeComplete={(color) =>
                                                        setNewItem({
                                                            ...newItem,
                                                            color: color.hex,
                                                        })
                                                    }
                                                />
                                                <button
                                                    onClick={() =>
                                                        setShowColorPicker(
                                                            false
                                                        )
                                                    }
                                                    className="mt-2 px-2 py-1 bg-gray-200 border rounded"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-2">
                                        <label className="block mobile:text-lg ipad:text-xl desktop:text-2xl font-normal">Tên màu</label>
                                        <input
                                            type="string"
                                            value={newItem.nameColor}
                                            onChange={(e) =>
                                                setNewItem({
                                                    ...newItem,
                                                    nameColor: e.target.value,
                                                })
                                            }
                                            className="border border-black rounded px-2 py-1"
                                            placeholder="Enter color name"
                                        />
                                    </div>
                                </div>

                                <div className="flex-row gap-5">
                                    <div>
                                        <label className="block mobile:mt-2 ipad:mt-0 mobile:text-lg ipad:text-xl desktop:text-2xl font-normal">Size</label>
                                        <select
                                            value={newItem.size}
                                            onChange={(e) =>
                                                setNewItem({
                                                    ...newItem,
                                                    size: e.target.value,
                                                })
                                            }
                                            className="border border-black rounded px-2 py-1"
                                        >
                                            <option value="">Chọn size</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                        </select>
                                    </div>

                                    <div className="mt-2">
                                        <label className="block mobile:text-lg ipad:text-xl desktop:text-2xl font-normal">Quantity</label>
                                        <input
                                            type="number"
                                            value={newItem.quantity}
                                            onChange={(e) =>
                                                setNewItem({
                                                    ...newItem,
                                                    quantity: e.target.value,
                                                })
                                            }
                                            className="border border-black rounded px-1 py-1"
                                            placeholder="Enter quantity"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* btn Thêm color, size... */}
                            <div className="mt-2 mb-2 flex items-center justify-center">
                                <button
                                    onClick={handleAddItem}
                                    className="bg-blue-500 py-[2px] w-40 hover:bg-blue-800 text-white text-lg rounded
                                    transition-all duration-200 outline-none ring-indigo-500/70 ring-offset-2 focus-visible:ring-2 hover:scale-[1.03] active:scale-[0.98]"
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>

                        {/* Phân loại  */}
                        <div className="mb-4  ipad:grid ipad:grid-cols-2">
                        <div>
                            <label className="block font-semibold mb-1 mobile:text-lg ipad:text-xl desktop:text-2xl">Phân loại<span className="text-red-600">*</span></label>
                            <select 
                                className="w-full h-[50px] border border-black rounded px-3 py-2"
                                onChange={handleCategoryChange}
                                value={getCategoryNameById(product.category_type_id)}
                                >
                                <option value="" disabled>
                                    Chọn phân loại
                                </option>
                                    {Object.keys(categoryTypeMap).map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                    ))}
                            </select>
                        </div>
                        </div>

                        <div >
                            <label className="block font-semibold mb-1 mobile:text-lg ipad:text-xl desktop:text-2xll">Mô tả sản phẩm<span className="text-red-600">*</span></label>
                            <textarea 
                                type="text" 
                                placeholder="Nhập mô tả sản phẩm" 
                                value={product.description}
                                onChange={(e) =>
                                    setProduct({
                                        ...product,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full h-[280px] resize-none border border-black rounded px-2 py-2"
                            ></textarea>
                        </div>
                    </div>

                    {/* Cột phải */}
                    <div className="desktop:w-[30%] mobile:block desktop:block ">
                        <div className="desktop:mb-4 desktop:w-full ipad:w-[50%]">
                            <label className="block font-semibold mb-1 mobile:text-lg ipad:text-xl desktop:text-2xl">Hình ảnh chính của sản phẩm<span className="text-red-600">*</span></label>
                            <div className="border-dashed border-2 border-black rounded-lg p-1 text-center 
                                            desktop:h-[360px] desktop:w-[360px] 
                                            ipad:h-[300px] ipad:w-[300px]
                                            mobile:h-[80vw] 
                                            ipad:mr-2 desktop:mr-0"
                                onDrop={handleMainImageDrop}
                                onDragOver={handleDragOver}
                            >
                                {mainImage ? (
                                    <div className="relative h-full w-full">
                                        <img
                                            src={mainImage}
                                            alt="Main product"
                                            className="h-full w-full rounded-lg object-cover"
                                        />
                                        <button
                                            onClick={removeMainImage}
                                            className="absolute h-10 w-10 top-2 right-2 bg-white border border-[#DC3E2E] rounded-full p-1 hover:bg-red-600"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                size="lg"
                                                style={{ color: "#DC3E2E" }}
                                            />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faCloudArrowUp}
                                            size="2xl"
                                            style={{ color: "#4379ee" }}
                                        />
                                        <p>
                                            Kéo thả hình ảnh ở đây
                                            <br />
                                            hoặc{" "}
                                            <span
                                                className="text-blue-500 cursor-pointer"
                                                onClick={() =>
                                                    mainImageInputRef.current.click()
                                                }
                                            >
                                                mở thư mục
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={mainImageInputRef}
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleMainImageUpload}
                            />
                        </div>

                        <div className=" desktop:w-full ipad:w-[50%]">
                            <label className="block font-semibold mb-1 mobile:text-lg ipad:text-xl desktop:text-2xl">Các hình ảnh khác:</label>
                            <div className="grid grid-cols-2 gap-5 justify-center items-center">
                                {otherImages.map((image, index) => (
                                <div key={index} 
                                    className="
                                        mobile:h-[140px] mobile:w-[150px] 
                                        desktop:h-[170px] desktop:w-[170px] 
                                        border-dashed border-2 border-black rounded-lg text-center"
                                    onDrop={(e) => handleImageDrop(e, index)}
                                    onDragOver={handleDragOver}
                                >
                                {image ? (
                                    <div className="relative h-full w-full">
                                        <img src={image} alt={`Product ${index}`} className="h-full w-full object-cover" />
                                        <button
                                            onClick={() => removeOtherImage(index)}
                                            className="absolute h-8 w-8 top-1 right-1 bg-white border border-[#DC3E2E] text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <FontAwesomeIcon icon={faTrash} size="sm" style={{color: "#DC3E2E",}} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className=" w-full h-full flex flex-col items-center justify-center">
                                    <FontAwesomeIcon icon={faCloudArrowUp} size="xl" style={{color: "#4379ee",}} />
                                    <p>Kéo thả <br/> 
                                        hoặc <span className="text-blue-500 cursor-pointer" onClick={() => otherImageInputRefs.current[index].click()}>mở thư mục</span></p>
                                </div>
                                )}
                                <input
                                    type="file"
                                    ref={(el) => (otherImageInputRefs.current[index] = el)}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e) => handleOtherImageUpload(e, index)}
                                />
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="items-center gap-6 flex w-full justify-center mt-4">
                    <button
                        onClick={() => {
                            modalFalse()
                            setTimeout(() => {
                                onClose(); 
                            }, 400);  
                        }}
                        className="bg-gray-500 text-white px-12 py-1 text-xl font-extrabold rounded border hover:bg-blue-800
                        transition-all duration-200 outline-none ring-indigo-500/70 ring-offset-2 focus-visible:ring-2 hover:scale-[1.03] active:scale-[0.98]"
                    >
                        HỦY
                    </button>
                    <button
                        onClick={handleSaveProduct}
                        className="bg-blue-500 text-white px-12 py-1 text-xl font-extrabold rounded border hover:bg-blue-800
                        transition-all duration-200 outline-none ring-indigo-500/70 ring-offset-2 focus-visible:ring-2 hover:scale-[1.03] active:scale-[0.98]"
                    >
                        LƯU
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ProductEdit;
