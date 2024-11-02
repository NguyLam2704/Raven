<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>user</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx','resources/css/app.css'])
</head>
<body>
    <header class=" fixed top-0 w-full bg-white  ">
        <nav class="flex flex-row items-center justify-between h-24 border-b-[1px] border-b-black w-full">
            <div class=" items-center justify-items-center basis-2/12 ">
                <img src="{{ Storage::url('assets/Raven.svg') }}" alt="Logo">
            </div>
            <ul class=" basis-6/12 items-center flex justify-between mt-10 mb-4 mx-20 ">
                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-['Montserrat']">HOME</li>
                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-['Montserrat']">ÁO</li>
                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-['Montserrat']">QUẦN</li>
                <li class=" h-9 text-center text-[#a91d3a] text-2xl font-bold font-['Montserrat']">PHỤ KIỆN</li>
                <li class="h-9 text-center text-[#a91d3a] text-2xl font-bold font-['Montserrat']">VỀ CHÚNG TÔI</li>
            </ul>
            <div class=" basis-3/12 flex flex-row justify-items-center rounded-[8px] shadow border items-center w-full mt-3 ">
                
                    <img class="inline-block m-2" src="{{ Storage::url('assets/Search.svg') }}" alt="search">
                    <span >
                        <Input placeholder="Tìm kiếm" class="m-2 focus:outline-none"></Input>
                    </span>
                    
            </div>
            <div class=" basis-1/12 flex flex-row mt-3 ml-10 ">
                    <img class="inline-block" src="{{ Storage::url('assets/Cart.svg') }}" alt="cart">
                    <span>
                        <div class="ml-1 focus:outline-none">3</div>
                    </span>
            </div>
        </nav>
    </header>
    <div>
    <main class=" mt-[100px] text-2xl">
   </main>
    </div>
    <footer class="flex flex-row justify-items-center bg-[#151515] w-full h-[380px]  ">
        <div class=" basis-1/12"></div>
        <div class=" basis-5/12 justify-items-center mt-9">
            <ul class="    ">
                <li class=" text-white text-3xl font-bold font-['Public Sans'] my-2">RAVEN</li>
                <li class=" text-white text-base font-light font-['Public Sans'] my-1">Công ty TNHH bốn thành viên UIT</li>
                <li class=" text-white text-base font-light font-['Public Sans'] my-1">Đại diện: Đoàn Nguyễn Lâm</li>
                <li class=" text-white text-base font-light font-['Public Sans'] my-1">Địa chỉ: P B3.14, Tòa B, Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</li>
                <li class=" text-white text-base font-light font-['Public Sans'] my-1">Điện thoại: 0384666498</li>
                <li class=" text-white text-base font-light font-['Public Sans'] my-1">Email: 22520736@gm.uit.edu.vn</li>
            </ul>            
        </div>
        <div  class=" basis-3/12 justify-items-center mt-9 ">
            <div class="">
                <ul class="w-[300]">
                    <li class=" w-[300] text-white text-3xl font-bold font-['Public Sans'] my-2">HỖ TRỢ</li>
                    <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Kiểm tra đơn hàng</li>
                    <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Điều khoản và dịch vụ</li>
                    <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-">Điều khoản và dịch vụ</li>
                </ul>  
                <ul class="w-[300] ">
                    <li class=" w-[300] text-white text-3xl font-bold font-['Public Sans'] mb-2 mt-6">CHÍNH SÁCH</li>
                    <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Chính sách mua hàng</li>
                    <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Chính sách bảo mật</li>
                    <li class=" w-[300] text-white text-base font-extralight font-['Public Sans'] my-1">Chính sách đổi trả</li>
                </ul>
            </div>       
        </div>
        <div class=" basis-2/12 justify-items-center ml-6 mt-9">
            <div class="mb-3">
                <img src="{{ Storage::url('assets/Logo.svg') }}" alt="Logo">
            </div>
            <div class="text-center text-white text-3xl font-bold font-['Public Sans'] mt-6 mb-2">KẾT NỐI</div>
            <div class="flex flex-row ">                
                <img class="mx-2" src="{{ Storage::url('assets/facebook.svg') }}" alt="Logo">
                <img class="mx-2" src="{{ Storage::url('assets/instagram.svg') }}" alt="Logo">
                <img class="mx-2" src="{{ Storage::url('assets/tiktok.svg') }}" alt="Logo">
            </div>
        </div>
        <div class=" basis-1/12"></div>
    </footer>
    
</body>
</html>