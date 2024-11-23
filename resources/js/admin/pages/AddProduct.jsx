import React, {useState, useEffect, useRef} from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons"
import { SketchPicker } from "react-color"; 
import { Colors } from "chart.js";

const AddProduct = () => {
    const [items, setItems] = useState([]); // mảng màu, size, số lượng
    const [newItem, setNewItem] = useState({
      color: '#FFFFFF', // Default color is white
      size: '',
      quantity: '',
    });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [otherImages, setOtherImages] = useState([null, null, null, null])
    const mainImageInputRef = useRef(null);
    const otherImageInputRefs = useRef([]);

    const colorPickerRef = useRef(null);
    const sizeOptionsRef = useRef(null);


    //Tắt lựa chọn màu và size nếu click ra ngoài bảng chọn
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
            if (sizeOptionsRef.current && !sizeOptionsRef.current.contains(event.target)) {
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
          setNewItem({ color: '#FFFFFF', size: '', quantity: '' }); // Reset inputs
        } else {
          alert('Please select a size and enter a quantity');
        }
      };
    
    //Xóa màu, size, số lượng
      const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
      };

    //Kéo thả hình ảnh ở hình ảnh chính
    const handleMainImageDrop = (event) => {
        event.preventDefault(); // Ngăn hành vi mặc định của trình duyệt khi người dùng thả tệp vào phần tử (ví dụ: hiển thị tệp hoặc chuyển hướng).
        const file = event.dataTransfer.files[0]; // Lấy tệp đầu tiên từ sự kiện kéo thả (danh sách các tệp được thả).
        if (file && file.type.startsWith("image/")) { // Kiểm tra xem có tệp và tệp là hình ảnh không.
            const reader = new FileReader(); // Tạo đối tượng FileReader để đọc nội dung tệp.
            reader.onload = () => setMainImage(reader.result); // Khi hoàn tất việc đọc tệp, lưu dữ liệu (dưới dạng URL) vào state `mainImage`.
            reader.readAsDataURL(file); // Đọc nội dung tệp dưới dạng Data URL (chuỗi mã hóa Base64).
        }
    };
    

    //Kéo thả hình ảnh ở hình ảnh phụ
    const handleImageDrop = (event, index) => {
        event.preventDefault(); // Ngăn hành vi mặc định của trình duyệt khi kéo và thả tệp.
        const file = event.dataTransfer.files[0]; // Lấy tệp đầu tiên được thả vào từ sự kiện kéo thả.
        if (file && file.type.startsWith("image/")) { // Kiểm tra nếu có tệp và tệp là hình ảnh.
            const reader = new FileReader(); // Tạo đối tượng FileReader để đọc nội dung tệp.
            reader.onload = () => {
                const newImages = [...otherImages]; // Tạo một bản sao của mảng `otherImages` để tránh thay đổi trực tiếp.
                newImages[index] = reader.result; // Gán dữ liệu hình ảnh đã đọc (dưới dạng URL) vào vị trí chỉ định trong mảng.
                setOtherImages(newImages); // Cập nhật state `otherImages` với danh sách hình ảnh mới.
            };
            reader.readAsDataURL(file); // Đọc tệp dưới dạng Data URL.
        }
    };
    

    //Mở thư mục trên máy và chọn ảnh
    const handleMainImageUpload = (event) => {
        const file = event.target.files[0]; // Lấy tệp đầu tiên mà người dùng chọn.
        if (file && file.type.startsWith("image/")) { // Kiểm tra nếu có tệp và đó là một tệp hình ảnh.
            const reader = new FileReader(); // Tạo một đối tượng FileReader để đọc nội dung của tệp.
            reader.onload = () => setMainImage(reader.result); // Khi hoàn tất đọc, lưu dữ liệu dưới dạng URL vào state `mainImage`.
            reader.readAsDataURL(file); // Đọc nội dung của tệp dưới dạng Data URL (chuỗi mã hóa Base64).
        }
    };

    //Mở thư mục trên máy và chọn ảnh
    const handleOtherImageUpload = (event, index) => {
        const file = event.target.files[0]; // Lấy tệp đầu tiên mà người dùng chọn.
        if (file && file.type.startsWith("image/")) { // Kiểm tra nếu tệp là một hình ảnh.
            const reader = new FileReader(); // Tạo đối tượng FileReader để đọc tệp.
            reader.onload = () => {
                const newImages = [...otherImages]; // Tạo bản sao của mảng `otherImages` để tránh thay đổi trực tiếp.
                newImages[index] = reader.result; // Gán URL của ảnh đã đọc vào vị trí được chỉ định trong mảng.
                setOtherImages(newImages); // Cập nhật state `otherImages` với danh sách hình ảnh mới.
            };
            reader.readAsDataURL(file); // Đọc tệp dưới dạng Data URL.
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Ngăn trình duyệt thực hiện hành vi mặc định khi kéo thả (ví dụ: mở tệp).
    };

    //Xóa hình ảnh chính
    const removeMainImage = () => setMainImage(null);

    //Xóa hình ảnh phụ
    const removeOtherImage = (index) => {
        const newImages = [...otherImages];
        newImages[index] = null;
        setOtherImages(newImages);
    };


    return (
        <NavigationAdmin>
            <Helmet>
                <title>Thêm sản phẩm mới</title>
            </Helmet>
            <h1 className="text-[32px] font-bold mt-4">Thêm sản phẩm mới</h1>
            <div className="p-4 border bg-white rounded-lg border-[#050c9c]">
                <div className="flex">
                    {/* Cột trái */}
                    <div className="w-[70%] mr-12">
                        <div className="mb-4">
                            <label className="block font-semibold mb-1 text-2xl">Tên sản phẩm<span className="text-red-600">*</span></label>
                            <input type="text" placeholder="Nhập tên sản phẩm" className="w-full h-[50px] border rounded border-black px-3 py-2" />
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-1 text-2xl">Giá<span className="text-red-600">*</span></label>
                                <input type="number" placeholder="Nhập giá cho sản phẩm" className="w-full h-[50px] border border-black rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1 text-2xl">Sale</label>
                                <select className="w-full h-[50px] border-black border rounded px-3 py-2">
                                <option>Không có</option>
                                <option>10%</option>
                                <option>15%</option>
                                </select>
                            </div>
                        </div>

                        <table className="min-w-full my-6 border-collapse border border-black">
                            <thead>
                            <tr>
                                <th className="border border-black p-2 w-1/4 text-2xl font-semibold">Màu sắc</th>
                                <th className="border border-black p-2 w-1/4 text-2xl font-semibold">Size</th>
                                <th className="border border-black p-2 w-1/4 text-2xl font-semibold">Số lượng</th>
                                <th className="border border-black p-2 w-1/4 text-2xl font-semibold">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="border border-black">
                                <td className="p-2 text-center flex justify-center items-center mt-1">
                                    <div
                                    style={{ backgroundColor: item.color, width: '24px', height: '24px' }}
                                    ></div>
                                </td>
                                <td className=" border border-black p-2 text-center text-2xl font-normal">{item.size}</td>
                                <td className=" border border-black p-2 text-center text-2xl font-normal">{item.quantity}</td>
                                <td className="border border-black p-2 items-center justify-center text-center">
                                    <button
                                    onClick={() => handleDeleteItem(index)}
                                    className="bg-red-500 text-white px-2 py-1 border-2 rounded"
                                    >
                                    Xóa
                                    </button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>


                        <div className="text-2xl font-semibold">Nhập màu, size và số lượng<span className="text-red-600">*</span></div>
                        <div className="mb-4 mt-2 flex items-center px-4 py-1 gap-20 border border-black">
                            <div className="relative">
                                <label className="block text-2xl font-normal">Color</label>
                                <div
                                    className="w-8 h-8 border border-black rounded cursor-pointer"
                                    style={{ backgroundColor: newItem.color }}
                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                ></div>
                                {showColorPicker && (
                                    <div className="absolute top-full left-0 mt-2 p-2 border bg-[#245ee0] border-gray-300 rounded shadow-lg z-10">
                                        <SketchPicker
                                            color={newItem.color}
                                            onChangeComplete={(color) =>
                                            setNewItem({ ...newItem, color: color.hex })
                                            }
                                        />
                                        <button
                                            onClick={() => setShowColorPicker(false)}
                                            className="mt-2 px-2 py-1 bg-gray-200 border rounded"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-2xl font-normal">Size</label>
                                <select
                                    value={newItem.size}
                                    onChange={(e) => setNewItem({ ...newItem, size: e.target.value })}
                                    className="border border-black rounded px-2 py-1"
                                >
                                    <option value="">Select Size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-2xl font-normal">Quantity</label>
                                <input
                                    type="number"
                                    value={newItem.quantity}
                                    onChange={(e) =>
                                    setNewItem({ ...newItem, quantity: e.target.value })
                                    }
                                    className="border border-black rounded px-2 py-1"
                                    placeholder="Enter quantity"
                                />
                            </div>
                            <div className="mt-8">
                                <button
                                    onClick={handleAddItem}
                                    className="bg-blue-500 w-32 text-white text-xl px-4 rounded"
                                >
                                Thêm
                                </button>
                            </div>

                        </div>






                        <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1 text-2xl">Số lượng trong kho<span className="text-red-600">*</span></label>
                            <input type="number" placeholder="Nhập số lượng trong kho" className="w-full h-[50px] border border-black rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1 text-2xl">Phân loại<span className="text-red-600">*</span></label>
                            <select className="w-full h-[50px] border border-black rounded px-3 py-2">
                            <option>Áo thun</option>
                            <option>Sweater</option>
                            <option>...</option>
                            </select>
                        </div>
                        </div>

                        <div >
                            <label className="block font-semibold mb-1 text-2xl">Mô tả sản phẩm<span className="text-red-600">*</span></label>
                            <textarea type="text" placeholder="Nhập mô tả sản phẩm" className="w-full h-[280px] resize-none border border-black rounded px-2 py-2"></textarea>
                        </div>

                    </div>

                    {/* Cột phải */}
                    <div className="w-[30%]">
                        <div className="mb-4">
                            <label className="block font-semibold mb-1 text-2xl">Hình ảnh chính của sản phẩm<span className="text-red-600">*</span></label>
                            <div className="border-dashed border-2 border-black rounded-lg p-1 text-center h-[360px] w-[360px]"
                                onDrop={handleMainImageDrop}
                                onDragOver={handleDragOver}
                            >
                            {mainImage ? (
                                <div className="relative h-full w-full">
                                    <img src={mainImage} alt="Main product" className="h-full w-full rounded-lg object-cover" />
                                    <button
                                        onClick={removeMainImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                    <FontAwesomeIcon icon={faCloudArrowUp} size="2xl" style={{color: "#4379ee",}} />
                                    <p>Kéo thả hình ảnh ở đây<br/> 
                                    hoặc <span className="text-blue-500 cursor-pointer" onClick={() => mainImageInputRef.current.click() }>mở thư mục</span></p>
                                </div>
                            )}
                            </div>
                                <input
                                    type="file"
                                    ref={mainImageInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleMainImageUpload}
                                />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1 text-2xl">Các hình ảnh khác:</label>
                            <div className="grid grid-cols-2 gap-4 justify-between">
                                {otherImages.map((image, index) => (
                                <div key={index} 
                                    className="h-[170px] w-[170px] border-dashed border-2 border-black rounded-lg text-center"
                                    onDrop={(e) => handleImageDrop(e, index)}
                                    onDragOver={handleDragOver}
                                >
                                {image ? (
                                    <div className="relative h-full w-full">
                                        <img src={image} alt={`Product ${index}`} className="h-full w-full object-cover" />
                                        <button
                                            onClick={() => removeOtherImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            🗑️
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

                <div className="items-center flex w-full justify-center mt-4">
                    <button className="bg-blue-500 text-white px-12 py-1 font-extrabold rounded border border-[#050c9c]">THÊM</button>  
                </div>
          
            </div>
                
        </NavigationAdmin>
    );
}

export default AddProduct;