import React, {useState, useEffect, useRef} from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloudArrowUp, faTrash} from "@fortawesome/free-solid-svg-icons"
import { SketchPicker } from "react-color"; 
import { Colors } from "chart.js";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tpuxfltiiajorbixwyff.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdXhmbHRpaWFqb3JiaXh3eWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMTQyMDYsImV4cCI6MjA0NTc5MDIwNn0.uFsVNVpgjADNV1VezxrzTfrBawHMRedjZPP4u3E0NnU'; // Thay bằng key phù hợp
const supabase = createClient(supabaseUrl, supabaseKey);


const AddProduct = () => {
    const [product, setProduct] = useState({
        prod_name: "",
        cost: null,
        discount: 0,
        description: "",
        color_size_quantity: [],
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
      color: '#FFFFFF', // Default color is white
      nameColor: '',
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
          setNewItem({ color: '#FFFFFF', nameColor: '', size: '', quantity: '' }); // Reset inputs
        } else {
          alert('Please select a size and enter a quantity');
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
        "Nón": 11
    };

        // Xử lý thay đổi phân loại
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setProduct({
            ...product,
            category_type_id: categoryTypeMap[selectedCategory],
        });
    };


    
    //Mở thư mục trên máy và chọn ảnh
    const handleMainImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file); // Hiển thị preview hình ảnh
            setMainImage(previewUrl);

            const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);

            // Tạo tên file duy nhất giữ nguyên tên gốc và thêm timestamp
            const uniqueFileName = `main/${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;
    
            // Upload lên Supabase
            const { data, error } = await supabase.storage
                .from('Image/ProductImage') // Tên bucket trong storage của bạn
                .upload(uniqueFileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });
    
            if (error) {
                console.error("Upload error:", error);
                alert("Lỗi up ảnh");
                return;
            }
    
            const publicUrl = supabase.storage.from('Image/ProductImage').getPublicUrl(data.path).data.publicUrl;
            setMainImage(publicUrl);
            setProduct((prev) => ({
                ...prev,
                images: [{ img: publicUrl, is_primary: true }, ...prev.images.slice(1)]
            }));
        }
    };
    
    const handleOtherImageUpload = async (event, index) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file); // Hiển thị preview
            setOtherImages((prev) => {
                const newImages = [...prev];
                newImages[index] = previewUrl;
                return newImages;
            });

            const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);

            // Tạo tên file duy nhất giữ nguyên tên gốc và thêm timestamp
            const uniqueFileName = `other/${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;
    
    
            // Upload lên Supabase
            const { data, error } = await supabase.storage
                .from('Image/ProductImage')
                .upload(uniqueFileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });
    
            if (error) {
                console.error("Upload error:", error);
                alert("Lỗi upload ảnh phụ!");
                return;
            }
    
            const publicUrl = supabase.storage.from('Image/ProductImage').getPublicUrl(data.path).data.publicUrl;
            setOtherImages((prev) => {
                const newImages = [...prev];
                newImages[index] = publicUrl;
                return newImages;
            });

            setProduct((prev) => {
                const newImages = [...prev.images];
                newImages[index + 1] = { img: publicUrl, is_primary: false };
                return { ...prev, images: newImages };
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
            const previewUrl = URL.createObjectURL(file); // Hiển thị preview hình ảnh
            setMainImage(previewUrl);

            const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);

            // Tạo tên file duy nhất giữ nguyên tên gốc và thêm timestamp
            const uniqueFileName = `main/${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;
    
            // Upload lên Supabase
            const { data, error } = await supabase.storage
                .from('Image/ProductImage') // Tên bucket trong storage của bạn
                .upload(uniqueFileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });
    
            if (error) {
                console.error("Upload error:", error);
                alert("Lỗi up ảnh");
                return;
            }
    
            const publicUrl = supabase.storage.from('Image/ProductImage').getPublicUrl(data.path).data.publicUrl;
            setMainImage(publicUrl);
            setProduct((prev) => ({
                ...prev,
                images: [{ img: publicUrl, is_primary: true }, ...prev.images.slice(1)]
            }));
        }
    };
    

    //Kéo thả hình ảnh ở hình ảnh phụ
    const handleImageDrop = async (event, index) => {
        event.preventDefault(); // Ngăn hành vi mặc định của trình duyệt khi kéo và thả tệp.
        const file = event.dataTransfer.files[0]; // Lấy tệp đầu tiên được thả vào từ sự kiện kéo thả.
        if (file && file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file); // Hiển thị preview
            setOtherImages((prev) => {
                const newImages = [...prev];
                newImages[index] = previewUrl;
                return newImages;
            });

            const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);

            // Tạo tên file duy nhất giữ nguyên tên gốc và thêm timestamp
            const uniqueFileName = `other/${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;
    
    
            // Upload lên Supabase
            const { data, error } = await supabase.storage
                .from('Image/ProductImage')
                .upload(uniqueFileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });
    
            if (error) {
                console.error("Upload error:", error);
                alert("Lỗi upload ảnh phụ!");
                return;
            }
    
            const publicUrl = supabase.storage.from('Image/ProductImage').getPublicUrl(data.path).data.publicUrl;
            setOtherImages((prev) => {
                const newImages = [...prev];
                newImages[index] = publicUrl;
                return newImages;
            });

            setProduct((prev) => {
                const newImages = [...prev.images];
                newImages[index + 1] = { img: publicUrl, is_primary: false };
                return { ...prev, images: newImages };
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

    const handleSaveProduct = () => {
        if (!product.prod_name || !product.cost || !items.length || !product.category_type_id || !mainImage) {
          alert('Vui lòng điền đầy đủ thông tin cần thiết!');
          return;
        }
      
        const updatedProduct = {
          ...product,
          color_size_quantity: items.map((item) => ({
            color_code: item.color,
            nameColor: item.nameColor,
            size_code: item.size,
            quantity: parseInt(item.quantity, 10),
          })),
          images: [
            { img: mainImage, is_primary: true },
            ...otherImages.map((img) => ({ img, is_primary: false })).filter((img) => img.img), // Loại bỏ ảnh null
          ],
        };
      
        setProduct(updatedProduct);
      
        // Hiển thị thông tin sản phẩm trong console để kiểm tra
        console.log('Product saved:', updatedProduct);
        alert('Sản phẩm đã được lưu!');
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
                            <input 
                                type="text" 
                                placeholder="Nhập tên sản phẩm" 
                                value={product.prod_name}
                                onChange={(e) => setProduct({ ...product, prod_name: e.target.value })}
                                className="w-full h-[50px] border rounded border-black px-3 py-2" 
                            />
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-1 text-2xl">Giá<span className="text-red-600">*</span></label>
                                <input 
                                    type="number" 
                                    placeholder="Nhập giá cho sản phẩm" 
                                    value={product.cost || ""}
                                    onChange={(e) => setProduct({ ...product, cost: parseFloat(e.target.value) })}
                                    className="w-full h-[50px] border border-black rounded px-3 py-2" 
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1 text-2xl">Sale</label>
                                <input 
                                    type="number" 
                                    placeholder="Nhập sale" 
                                    value={product.discount || ""}
                                    onChange={(e) => setProduct({ ...product, discount: parseFloat(e.target.value) })}
                                    className="w-full h-[50px] border border-black rounded px-3 py-2" 
                                />
                            </div>
                        </div>

                        <table className="min-w-full my-6 border-collapse border border-black">
                            <thead>
                            <tr>
                                <th className="border border-black p-2 w-1/5 text-2xl font-semibold">Màu sắc</th>
                                <th className="border border-black p-2 w-1/5 text-2xl font-semibold">Tên màu</th>
                                <th className="border border-black p-2 w-1/5 text-2xl font-semibold">Size</th>
                                <th className="border border-black p-2 w-1/5 text-2xl font-semibold">Số lượng</th>
                                <th className="border border-black p-2 w-1/5 text-2xl font-semibold">Hành động</th>
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
                                <td className=" border border-black p-2 text-center text-2xl font-normal">{item.nameColor}</td>
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
                        <div className="mb-4 mt-2 flex items-center px-2 py-1 gap-3 border border-black">
                            <div className="flex-row w-[50%]">
                                <div className="relative">
                                    <label className="block text-2xl font-normal">Color</label>
                                    <div
                                        className="w-8 h-8 border border-black rounded cursor-pointer"
                                        style={{ backgroundColor: newItem.color }}
                                        onClick={() => setShowColorPicker(!showColorPicker)}
                                    ></div>
                                    {showColorPicker && (
                                        <div 
                                            ref={colorPickerRef}
                                            className="absolute left-0 mt-2 p-2 border bg-[#245ee0] border-gray-300 rounded shadow-lg z-10"
                                        >
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

                                <div className="mt-2">
                                    <label className="block text-2xl font-normal">Tên màu</label>
                                    <input
                                        type="string"
                                        value={newItem.nameColor}
                                        onChange={(e) =>
                                        setNewItem({ ...newItem, nameColor: e.target.value })
                                        }
                                        className="border border-black rounded px-2 py-1"
                                        placeholder="Enter color name"
                                    />
                                </div>
                            </div>

                            <div className="flex-row gap-5">
                                <div>
                                    <label className="block text-2xl font-normal">Size</label>
                                    <select
                                        value={newItem.size}
                                        onChange={(e) => setNewItem({ ...newItem, size: e.target.value })}
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
                                    <label className="block text-2xl font-normal">Quantity</label>
                                    <input
                                        type="number"
                                        value={newItem.quantity}
                                        onChange={(e) =>
                                        setNewItem({ ...newItem, quantity: e.target.value })
                                        }
                                        className="border border-black rounded px-1 py-1"
                                        placeholder="Enter quantity"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* btn Thêm color, size... */}
                        <div className="mt-2 mb-2 border items-center justify-center">
                                <button
                                    onClick={handleAddItem}
                                    className="bg-blue-500 w-32 text-white text-xl rounded"
                                >
                                Thêm
                                </button>
                        </div>


                        {/* Phân loại  */}
                        <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1 text-2xl">Phân loại<span className="text-red-600">*</span></label>
                            <select 
                                className="w-full h-[50px] border border-black rounded px-3 py-2"
                                onChange={handleCategoryChange}
                            >
                                <option value="">Chọn phân loại</option>
                                    {Object.keys(categoryTypeMap).map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        </div>

                        <div >
                            <label className="block font-semibold mb-1 text-2xl">Mô tả sản phẩm<span className="text-red-600">*</span></label>
                            <textarea 
                                type="text" 
                                placeholder="Nhập mô tả sản phẩm" 
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                className="w-full h-[280px] resize-none border border-black rounded px-2 py-2"></textarea>
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
                                        className="absolute h-10 w-10 top-2 right-2 bg-white border border-[#DC3E2E] rounded-full p-1 hover:bg-red-600"
                                    >
                                        <FontAwesomeIcon icon={faTrash} size="lg" style={{color: "#DC3E2E",}} />
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

                <div className="items-center flex w-full justify-center mt-4">
                    <button     
                        onClick={handleSaveProduct}
                        className="bg-blue-500 text-white px-12 py-1 font-extrabold rounded border border-[#050c9c]"
                    >
                        THÊM
                    </button>  
                </div>
          
            </div>
                
        </NavigationAdmin>
    );
}

export default AddProduct;