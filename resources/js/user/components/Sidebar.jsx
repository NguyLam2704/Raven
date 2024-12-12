import React from 'react';

const SideBarUser = () => {
        //Giá trị để kiểm soát trạng thái ẩn/hiện của mục Áo
        const [isOpenAo, setOpenAo] = useState(false);
        //Giá trị để kiểm soát trạng thái ẩn/hiện của mục Quần
        const [isOpenQuan, setOpenQuan] = useState(false);
        //Giá trị để kiểm soát trạng thái ẩn/hiện của mục Phụ kiện
        const [isOpenPk, setOpenPk] = useState(false);
        const [menuOpen, setMenuOpen] = useState(false);
    
        //Kiểm soát trạng thái hiện của mục Áo
        const handleHoverAo = () => {
            setOpenAo(true);
        };
        //Kiểm soát trạng thái ẩn/hiện của mục Quần
        const handleHoverQuan = () => {
            setOpenQuan(true);
        };
        //Kiểm soát trạng thái ẩn/hiện của mục Phụ kiện
        const handleHoverPk = () => {
            setOpenPk(true);
        };
        //Kiểm soát trạng thái ẩn của mục Áo/Quần/Phụ kiện
        const handleMenuLeave = () => {
            setOpenAo(false);
            setOpenQuan(false);
            setOpenPk(false);
        };
    return (
        <nav className={`w-64 max-w-full mobile:hidden desktop:flex flex-col items-start justify-start h-full border border-red-700`}> 
        {/* Sidebar */}
        <ul className="w-full h-full flex flex-col gap-4 items-start justify-start px-4 pt-8">
            <li className="w-full">
            <div className='text-[#1E0342] text-lg font-bold hover:border-l-4 hover:border-l-[#222831] active:scale-[0.98] hover:scale-[1.03] pl-2'>
                <Link to="/">HOME</Link>
            </div>
            </li>
            <li className="w-full relative" onMouseLeave={handleMenuLeave}>
            <div className='text-[#1E0342] text-lg font-bold hover:border-l-4 hover:border-l-[#222831] active:scale-[0.98] hover:scale-[1.03] pl-2' 
                onMouseEnter={handleHoverAo}>
                <Link to="/T_shirt">ÁO</Link>
            </div>
            {isOpenAo && (
                <ul className='absolute left-full top-0 z-50 w-40 bg-[#C73659] text-base uppercase text-left text-white mt-0 ml-4'>
                <li className='py-2 px-3 border-b-[1px] border-white hover:font-bold'><Link to="/T_shirt">Áo thun</Link></li>
                <li className='py-2 px-3 border-b-[1px] border-white hover:font-bold'><Link to="/polo">Áo polo</Link></li>
                <li className='py-2 px-3 border-b-[1px] border-white hover:font-bold'><Link to="/outwear">Áo khoác</Link></li>
                <li className='py-2 px-3 border-b-[1px] border-white hover:font-bold'><Link to="/sweater">Áo sweater</Link></li>
                <li className='py-2 px-3 hover:font-bold'><Link to="/shirt">Áo sơ mi</Link></li>
                </ul>
            )}
            </li>
            <li className="w-full relative" onMouseLeave={handleMenuLeave}>
            <div className='text-[#1E0342] text-lg font-bold hover:border-l-4 hover:border-l-[#222831] active:scale-[0.98] hover:scale-[1.03] pl-2' 
                onMouseEnter={handleHoverQuan}>
                <Link to="/long_pants">QUẦN</Link>
            </div>
            {isOpenQuan && (
                <ul className='absolute left-full top-0 z-50 w-40 bg-[#C73659] text-base uppercase text-left text-white mt-0 ml-4'>
                <li className='py-2 px-3 border-b-[1px] border-white hover:font-bold'><Link to="/long_pants">QUẦN DÀI</Link></li>
                <li className='py-2 px-3 hover:font-bold'><Link to="/short_pants">QUẦN SHORT</Link></li>
                </ul>
            )}
            </li>
            <li className="w-full relative" onMouseLeave={handleMenuLeave}>
            <div className='text-[#1E0342] text-lg font-bold hover:border-l-4 hover:border-l-[#222831] active:scale-[0.98] hover:scale-[1.03] pl-2' 
                onMouseEnter={handleHoverPk}>
                <Link to="/balo">PHỤ KIỆN</Link>
            </div>
            {isOpenPk && (
                <ul className='absolute left-full top-0 z-50 w-40 bg-[#C73659] text-base uppercase text-left text-white mt-0 ml-4'>
                <li className='py-2 px-3 border-b-[1px] border-white hover:font-bold'><Link to="/balo">cặp</Link></li>
                <li className='py-2 px-3 border-b-[1px] border-white hover:font-bold'><Link to="/handbag">túi xách</Link></li>
                <li className='py-2 px-3 border-b-[1px] border-white hover:font-bold'><Link to="/wallet">ví</Link></li>
                <li className='py-2 px-3 hover:font-bold'><Link to="/hat">nón</Link></li>
                </ul>
            )}
            </li>
            <li className="w-full">
            <div className='text-[#1E0342] text-lg font-bold hover:border-l-4 hover:border-l-[#222831] active:scale-[0.98] hover:scale-[1.03] pl-2'>
                <Link to="/about_us">VỀ CHÚNG TÔI</Link>
            </div>
            </li>
        </ul>
        </nav>
    )
}

export default SideBarUser;