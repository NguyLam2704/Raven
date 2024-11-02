<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login admin</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx','resources/css/app.css'])
</head>
<body class="flex flex-col items-center justify-center h-screen w-full font-sans bg-login">
    <div class="mt-5">
        <h1 class="text-[32px] font-bold text-white text-center mb-6">ADMIN DASHBOARD</h1>
    </div>
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[500px] h-3/4 border-2 border-red">
        <h2 class="text-2xl font-medium text-center mb-4 mt-9">Đăng nhập</h2>
        <p class="text-sm text-center mb-6 text-gray-600">Vui lòng nhập email và password Admin đã được cung cấp</p>
        <p class="text-xs text-center text-gray-500 mt-12 w-[80%] mx-auto">*Lưu ý: Nếu quên mật khẩu vui lòng liên hệ email 22520736@gm.uit.edu.vn để được hỗ trợ</p>
    </div>
</body>
</html>

<!-- {{-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx','resources/css/app.css'])
</head>
<body >
    <div id="app"></div>
</body>
</html> --}} -->