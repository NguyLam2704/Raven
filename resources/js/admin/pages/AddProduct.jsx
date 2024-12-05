import React, {useState, useEffect, useRef} from "react";
import { Helmet } from "react-helmet";
import NavigationAdmin from "../components/NavigationAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCloudArrowUp, faTrash} from "@fortawesome/free-solid-svg-icons"
import { SketchPicker } from "react-color"; 
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);


const AddProduct = () => {
    const navigate = useNavigate();
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
    // const handleMainImageUpload = async (event) => {
    //     const file = event.target.files[0];
    //     if (file && file.type.startsWith("image/")) {
    //         const previewUrl = URL.createObjectURL(file); // Hiển thị preview hình ảnh
    //         setMainImage(previewUrl);

    //         const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);

    //         // Tạo tên file duy nhất giữ nguyên tên gốc và thêm timestamp
    //         const uniqueFileName = `main/${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;
    
    //         // Upload lên Supabase
    //         const { data, error } = await supabase.storage
    //             .from('Image/ProductImage') // Tên bucket trong storage của bạn
    //             .upload(uniqueFileName, file, {
    //                 cacheControl: '3600',
    //                 upsert: false
    //             });
    
    //         if (error) {
    //             console.error("Upload error:", error);
    //             alert("Lỗi up ảnh");
    //             return;
    //         }
    
    //         const publicUrl = supabase.storage.from('Image/ProductImage').getPublicUrl(data.path).data.publicUrl;
    //         setMainImage(publicUrl);
    //         setProduct((prev) => ({
    //             ...prev,
    //             images: [{ img: publicUrl, is_primary: true }, ...prev.images.slice(1)]
    //         }));
    //     }
    // };
    
    // const handleOtherImageUpload = async (event, index) => {
    //     const file = event.target.files[0];
    //     if (file && file.type.startsWith("image/")) {
    //         const previewUrl = URL.createObjectURL(file); // Hiển thị preview
    //         setOtherImages((prev) => {
    //             const newImages = [...prev];
    //             newImages[index] = previewUrl;
    //             return newImages;
    //         });

    //         const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);

    //         // Tạo tên file duy nhất giữ nguyên tên gốc và thêm timestamp
    //         const uniqueFileName = `other/${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;
    
    
    //         // Upload lên Supabase
    //         const { data, error } = await supabase.storage
    //             .from('Image/ProductImage')
    //             .upload(uniqueFileName, file, {
    //                 cacheControl: '3600',
    //                 upsert: false
    //             });
    
    //         if (error) {
    //             console.error("Upload error:", error);
    //             alert("Lỗi upload ảnh phụ!");
    //             return;
    //         }
    
    //         const publicUrl = supabase.storage.from('Image/ProductImage').getPublicUrl(data.path).data.publicUrl;
    //         setOtherImages((prev) => {
    //             const newImages = [...prev];
    //             newImages[index] = publicUrl;
    //             return newImages;
    //         });

    //         setProduct((prev) => {
    //             const newImages = [...prev.images];
    //             newImages[index + 1] = { img: publicUrl, is_primary: false };
    //             return { ...prev, images: newImages };
    //         });
    //     }
    // };
    
    const [mainImageFile, setMainImageFile] = useState(null);
    const [otherImageFiles, setOtherImageFiles] = useState([null, null, null, null]);

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

    // const handleSaveProduct = () => {
    //     if (!product.prod_name || !product.cost || !items.length || !product.category_type_id || !mainImage) {
    //       alert('Vui lòng điền đầy đủ thông tin cần thiết!');
    //       return;
    //     }
      
    //     const updatedProduct = {
    //       ...product,
    //       color_size_quantity: items.map((item) => ({
    //         color_code: item.color,
    //         nameColor: item.nameColor,
    //         size_code: item.size,
    //         quantity: parseInt(item.quantity, 10),
    //       })),
    //       images: [
    //         { img: mainImage, is_primary: true },
    //         ...otherImages.map((img) => ({ img, is_primary: false })).filter((img) => img.img), // Loại bỏ ảnh null
    //       ],
    //     };
      
    //     setProduct(updatedProduct);
      
    //     // Hiển thị thông tin sản phẩm trong console để kiểm tra
    //     console.log('Product saved:', updatedProduct);
    //     alert('Sản phẩm đã được lưu!');
    //   };
      
    const handleSaveProduct = async () => {

        if (!product.prod_name || !product.cost || !items.length || !product.category_type_id || !mainImageFile) {
            alert('Vui lòng điền đầy đủ thông tin cần thiết!');
            return;
        }
    
        try {
            const loadingSwal = Swal.fire({
                title: 'Loading...!',
                text: 'Đang thêm sản phẩm',
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(); // Hiển thị spinner loading
                }
            });
            let uploadedMainImageUrl = null;
            const uploadedOtherImageUrls = [];
    
            // Upload main image
            if (mainImageFile) {
                const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);
                const uniqueFileName = `main/${mainImageFile.name.split('.')[0]}_${timestamp}.${mainImageFile.name.split('.').pop()}`;
                const { data, error } = await supabase.storage
                    .from('Image/ProductImage')
                    .upload(uniqueFileName, mainImageFile, {
                        cacheControl: '3600',
                        upsert: false
                    });
    
                if (error) throw error;
                uploadedMainImageUrl = supabase.storage.from('Image/ProductImage').getPublicUrl(data.path).data.publicUrl;
            }
    
            // Upload other images
            for (const file of otherImageFiles) {
                if (file) {
                    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);
                    const uniqueFileName = `other/${file.name.split('.')[0]}_${timestamp}.${file.name.split('.').pop()}`;
                    const { data, error } = await supabase.storage
                        .from('Image/ProductImage')
                        .upload(uniqueFileName, file, {
                            cacheControl: '3600',
                            upsert: false
                        });
    
                    if (error) throw error;
                    const publicUrl = supabase.storage.from('Image/ProductImage').getPublicUrl(data.path).data.publicUrl;
                    uploadedOtherImageUrls.push(publicUrl);
                }
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
                    { img: uploadedMainImageUrl, is_primary: true },
                    ...uploadedOtherImageUrls.map((url) => ({ img: url, is_primary: false }))
                ],
            };
    
            setProduct(updatedProduct);


    
            console.log('Product saved:', updatedProduct);
            await Swal.fire({
                title: 'Thành công!',
                text: 'Sản phẩm đã được thêm ',
                icon: 'success',
                showConfirmButton: false,
                timer: 4000,
            });

            navigate('/products_admin');
        } catch (error) {
            console.error('Upload error:', error);
            Swal.fire({
                title: 'Lỗi!',
                text: 'Đã xảy ra lỗi khi thêm sản phẩm!',
                icon: 'error',
                showConfirmButton: true
            });
        }
    };
    
      

    return (
        <NavigationAdmin>
            <Helmet>
                <title>Thêm sản phẩm mới</title>
            </Helmet>
            <h1 className="mobile:text-[20px] ipad:text-[25px]  desktop:text-[32px] font-bold mt-4">Thêm sản phẩm mới</h1>
            <div className="p-4 border bg-white rounded-lg border-[#050c9c]">
                <div className="desktop:flex">
                    {/* Cột trái */}
                    <div className="desktop:w-[70%] desktop:mr-12">
                        <div className="mb-4">
                            <label className="block font-semibold mb-1 mobile:text-lg ipad:text-xl desktop:text-2xl">Tên sản phẩm<span className="text-red-600">*</span></label>
                            <input 
                                type="text" 
                                placeholder="Nhập tên sản phẩm" 
                                value={product.prod_name}
                                onChange={(e) => setProduct({ ...product, prod_name: e.target.value })}
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
                                    onChange={(e) => setProduct({ ...product, cost: parseFloat(e.target.value) })}
                                    className="w-full h-[50px] border border-black rounded px-3 py-2" 
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mobile:mt-4 ipad:mt-0 ipad:mb-1 mobile:text-lg ipad:text-xl desktop:text-2xl">Sale</label>
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
                                            style={{ backgroundColor: newItem.color }}
                                            onClick={() => setShowColorPicker(!showColorPicker)}
                                        ></div>
                                        {showColorPicker && (
                                            <div 
                                                ref={colorPickerRef}
                                                className="absolute left-0 mt-2 p-2 border bg-[#245ee0] border-gray-300 rounded shadow-lg z-0"
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
                                        <label className="block mobile:text-lg ipad:text-xl desktop:text-2xl font-normal">Tên màu</label>
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
                                        <label className="block mobile:mt-2 ipad:mt-0 mobile:text-lg ipad:text-xl desktop:text-2xl font-normal">Size</label>
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
                                        <label className="block mobile:text-lg ipad:text-xl desktop:text-2xl font-normal">Quantity</label>
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
                            <div className="mt-2 mb-2 flex items-center justify-center">
                                    <button
                                        onClick={handleAddItem}
                                        className="bg-blue-500 py-[2px] w-40 hover:bg-blue-800 text-white text-lg rounded"
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
                            <label className="block font-semibold mb-1 mobile:text-lg ipad:text-xl desktop:text-2xll">Mô tả sản phẩm<span className="text-red-600">*</span></label>
                            <textarea 
                                type="text" 
                                placeholder="Nhập mô tả sản phẩm" 
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                className="w-full h-[280px] resize-none border border-black rounded px-2 py-2"></textarea>
                        </div>

                    </div>

                    {/* Cột phải */}
                    <div className="desktop:w-[30%] mobile:block ipad:flex desktop:block ">
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

                <div className="items-center flex w-full justify-center mt-4">
                    <button     
                        onClick={handleSaveProduct}
                        className="bg-blue-500 text-white px-12 py-1 text-xl font-extrabold rounded border border-[#050c9c]"
                    >
                        THÊM SẢN PHẨM
                    </button>  
                </div>
                                
            </div>
                
        </NavigationAdmin>
    );
}

export default AddProduct;