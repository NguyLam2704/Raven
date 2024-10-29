<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx','resources/css/app.css'])
</head>
<body class="flex h-screen font-sans">
    <div class="admin-dashboard flex w-full">
  
      <!-- Phần Navigation -->
      <nav class="sidebar w-60 bg-white text-white flex flex-col p-5 fixed left-0 top-0 bottom-0 border-r border-gray-300">
        <h2 class="mb-7 text-2xl text-center text-black"><strong class="mb-7 text-2xl text-center text-blue-600">Raven</strong> Store</h2>
        <ul class="list-none p-0">
          <li class="mb-2">
            <a href="#" class="text-black no-underline text-2xl p-2 flex rounded font-bold hover:bg-blue-600 hover:text-white">
              <img alt="icon" src="../admin/asset/icon/chart.svg" class="h-6 w-6 mt-1 mr-2">
              Tổng quan</a>
          </li>
          <li class="mb-2">
            <a href="#" class="text-black no-underline text-2xl p-2 flex rounded font-bold hover:bg-blue-600 hover:text-white">
              <img alt="icon" src="../admin/asset/icon/checklist.svg" class="h-6 w-6 mt-1 mr-2 ">
              Đơn hàng</a>
          </li>
          <li class="dropdown relative mb-2">
            <a href="#" class="dropdown-toggle text-black no-underline text-2xl p-2 flex rounded font-bold hover:bg-blue-600 hover:text-white">
              <img alt="icon" src="../admin/asset/icon/category.svg" class="h-6 w-6 mt-1 mr-2">
              Sản phẩm</a>
            <ul class="dropdown-menu list-none pl-5 hidden">
              <li class="m-4"><a href="#" class="font-normal text-left block h-8 text-base text-black hover:bg-blue-600 hover:text-white">Sản phẩm hiện có</a></li>
              <li class="m-4"><a href="#" class="font-normal text-left block h-8 text-base text-black hover:bg-blue-600 hover:text-white">Thêm sản phẩm mới</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="text-black no-underline text-2xl p-2 flex rounded font-bold hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white">
              <img alt="icon" src="../admin/asset/icon/groups.svg" class="h-6 w-6 mt-1 mr-2 ">
              Khách hàng</a>
          </li>
        </ul>
      </nav>
  
      <!-- Phần Header -->
      <header class="header bg-white fixed top-0 right-0 left-60 h-20 flex justify-between items-center p-5 border-b border-gray-300">
        <h1 class="text-4xl text-blue-600 text-center font-bold w-full z-10">ADMIN DASHBOARD</h1>
        <div class="user-info flex items-center w-1/6 absolute h-full right-5 z-20">
          <img src="../admin/asset/avatar.jpeg" alt="User Avatar" class="avatar w-16 h-16 rounded-full mr-2">
          <div class="user-name flex flex-col items-start relative ">
            <span class="text-lg">Luan dz</span>
            <span class="role text-xs text-gray-600">Admin</span>
          </div>
          <ul class="user-dropdown absolute top-20 bg-white shadow-md list-none p-2 w-44 z-10 rounded-2xl border-2 hidden">
            <li><a href="#" class="p-2 text-sm text-gray-800 hover:bg-gray-200 flex"><img alt="icon" src="../admin/asset/icon/settings.svg" class="h-4 w-4 mt-0.5 mr-1  items-center">Quản lý tài khoản</a></li>
            <li><a href="#" class="p-2 text-sm text-gray-800 hover:bg-gray-200 flex"><img alt="icon" src="../admin/asset/icon/key.svg" class="h-4 w-4 mt-0.5 mr-1  items-center">Thay đổi mật khẩu</a></li>
            <li><a href="#" class="p-2 text-sm text-gray-800 hover:bg-gray-200 flex"><img alt="icon" src="../admin/asset/icon/logout.svg" class="h-4 w-4 mt-0.5 mr-1  items-center">Đăng xuất</a></li>
          </ul>
          <div>
            <button type="button" class="dropdown-btn border-none bg-none text-xs cursor-pointer ml-6 z-20"><img alt="icon" src="../admin/asset/icon/More.svg" class="h-6 w-6 mt-0.5 mr-1 items-center"> </button>
          </div>
        </div>
  
      </header>
  
      <!-- Phần nội dung sẽ scroll -->
      <div class="main-content w-full mt-20 ml-60 p-5 overflow-y-auto h-full bg-gray-100">
        <div class="bg-white p-6 rounded shadow-lg block">
            <label for="colorPicker" class="block text-sm font-medium text-gray-700 mb-2 align-bottom">Choose a color:</label>
            <input type="color" id="colorPicker" class="block w-10 h-10 rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
            <input type="text" id="text" class="text-xl border-2">
        </div>
      </div>
    </div>

    <script>
      
      document.addEventListener("DOMContentLoaded", function() {
          const dropdownBtn = document.querySelector('.dropdown-btn');
          const userDropdown = document.querySelector('.user-dropdown');
  
          dropdownBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            userDropdown.classList.toggle('hidden');
          });
  
          window.addEventListener('click', function(e) {
            if (!dropdownBtn.contains(e.target) && !userDropdown.contains(e.target)) {
              userDropdown.classList.add('hidden');
            }
          });
  
          const productDropdownToggle = document.querySelector('.dropdown-toggle');
          const productDropdownMenu = document.querySelector('.dropdown-menu');
  
          productDropdownToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            productDropdownMenu.classList.toggle('hidden');
          });
  
          window.addEventListener('click', function(e) {
            if (!productDropdownToggle.contains(e.target) && !productDropdownMenu.contains(e.target)) {
              productDropdownMenu.classList.add('hidden');
            }
          });

          document.getElementById('colorPicker').addEventListener('input', function() {
            document.getElementById('text').style.color = this.value;
           });
        });

    </script>
  </body>
</html>
