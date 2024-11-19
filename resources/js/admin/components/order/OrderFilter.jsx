import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

// Custom styles for modal
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        with: '475px'
    },
};

const OrderFilter = ({ onFilterChange }) => {
    //Mảng statusOptions chứa các trạng thái đơn hàng có thể lọc được.
    const statusOptions = ['Đã hoàn thành', 'Đã hủy', 'Đang xử lý', 'Đang giao hàng'];
    //Quản lý trạng thái của ngày được chọn trong bộ lọc.
    const [selectedDate, setSelectedDate] = useState(null);
    //Quản lý trạng thái mở/đóng của modal.
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Quản lý các trạng thái đơn hàng được chọn.
    const [selectedStatuses, setSelectedStatuses] = useState(statusOptions);

    //Mở hoặc đóng modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // thêm hoặc xóa trạng thái từ selectedStatuses. 
    // nếu trạng thái đã có trong danh sách, nó sẽ được loại bỏ; nếu không, nó sẽ được thêm vào.
    const handleStatusChange = (status) => {
        setSelectedStatuses((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
        );
    };

    //áp dụng bộ lọc và gọi onFilterChange với giá trị của ngày và các trạng thái được chọn, sau đó đóng modal.
    const applyFilters = () => {
        onFilterChange({ date: selectedDate, statuses: selectedStatuses });
        toggleModal();
    };

    return (
        <div className="flex w-[30rem] items-center gap-4 p-4 bg-white rounded-lg shadow">
            {/* Date Picker */}
            <div className="flex items-center gap-2 border-x-2">
                <span className="icon-filter"></span>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        onFilterChange({ date, statuses: selectedStatuses });
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText={selectedDate ? selectedDate.toLocaleDateString('vi-VN') : "Chọn ngày"}
                    maxDate={new Date()}
                    className="px-2"
                />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
                <button
                    onClick={toggleModal}
                    className="px-4 border-x-2  bg-white"
                >
                    Trạng thái <span className="icon-dropdown"></span>
                </button>
            </div>

            {/* Reset Filters */}
            <button
                onClick={() => {
                    setSelectedDate(null);
                    setSelectedStatuses(statusOptions); // Đặt lại tất cả trạng thái
                    onFilterChange({ date: null, statuses: statusOptions });
                }}
                className="text-red-500 px-4"
            >
                Đặt lại <span className="icon-reset"></span>
            </button>

            {/* Status Modal */}
            <Modal isOpen={isModalOpen} onRequestClose={toggleModal} style={modalStyles}>
                <h3 className="text-lg font-bold mb-4">Chọn trạng thái đơn hàng</h3>
                <div className="grid grid-cols-2 gap-4 justify-between4">
                    {statusOptions.map((status) => (
                        <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={`px-4 py-2 h-[34px] text-sm border border-black rounded-2xl ${
                                selectedStatuses.includes(status)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <p className='text-[#434343] text-sm font-normal mt-6'>*Bạn có thể chọn nhiều trạng thái đơn hàng</p>
                <button
                    onClick={applyFilters}
                    className="px-4 w-[129px] h-[34px] mt-6 bg-blue-500 text-white rounded-lg"
                >
                    Xác nhận
                </button>
            </Modal>
        </div>
    );
};

export default OrderFilter;
