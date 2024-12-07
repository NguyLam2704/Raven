<?php

use App\Http\Controllers\Api\Auth\AdminController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Dashboard\DashboardController;
use App\Http\Controllers\Api\Dashboard\ProductDetailsController;
use App\Http\Controllers\Api\Dashboard\UserDetailsController;
use App\Http\Controllers\Api\Dashboard\ViewsController;
use App\Http\Controllers\Api\V1\BillController;
use App\Http\Controllers\Api\V1\ColorController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\SizeController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\CategoryTypeController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\ProColorSizeController;
use App\Http\Controllers\Api\V1\ProductImageController;
use App\Http\Controllers\Api\V1\ProductOrderController;
use App\Http\Controllers\Api\V1\TestController;
use App\Http\Controllers\Api\V1\UserController;
use App\Mail\CheckOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// Route::apiResource('size',SizeController::class);

//api/v1
Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    //add route here
    Route::apiResource('size', SizeController::class);
    Route::apiResource('color', ColorController::class);
    Route::apiResource('product', ProductController::class);
    Route::apiResource('category', CategoryController::class);
    Route::apiResource('categoryType', CategoryTypeController::class);
    Route::apiResource('test', TestController::class);
    Route::apiResource('proColorSize', ProColorSizeController::class);
    Route::apiResource('productImage', ProductImageController::class);
    Route::apiResource('order', OrderController::class);
    Route::apiResource('bill', BillController::class);
    Route::apiResource('user', UserController::class);
    Route::apiResource('productOrder', ProductOrderController::class);
    Route::post('orderInfo', [OrderController::class, 'orderInfo']); //check order : api/v1/orderInfo
    Route::post('verifyOrder',[OrderController::class,'testMail']);  
    Route::post('/updateOrder',[OrderController::class,'updateOrder']);
});

//auth
Route::post('/admin/auth/register', [AuthController::class, 'register']);
Route::post('/admin/auth/login', [AuthController::class, 'login']);
Route::post('/admin/auth/sendemail', [ResetPasswordController::class, 'sendEmail']);
Route::post('/admin/reset-password', [ResetPasswordController::class, 'resetpassword'])->name('resetpassword');
Route::post('/admin/changepass', [ResetPasswordController::class, 'changepass']);


Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::put('/{id}', [AdminController::class, 'updateAdmin']);
    Route::post('/{id}/changepassword', [AuthController::class, 'changePass']);
});

Route::prefix('dashboard')->group(function () {
    Route::get('/thongke', [DashboardController::class, 'thongke']);
    Route::get('/chitietdonhang/{order_id}', [DashboardController::class, 'chitietdonhang']);
    Route::patch('/chitietdonhang/{order_id}', [DashboardController::class, 'ChangeStatus']);
    Route::get('/chitiet/{nam}/{thang}', [DashboardController::class, 'chitiet']);
    Route::get('/user/{id}', [UserDetailsController::class, 'UserDetails']);
    Route::get('/user/{id}/bieudo/{type}', [UserDetailsController::class, 'getAmount']);
    Route::get('/getSizeColorById/{id}', [DashboardController::class, 'getSizeColorById']);
    Route::get('/getUserByPhone/{phone}', [DashboardController::class, 'getUserByPhone']);
    Route::get('/views', [ViewsController::class, 'addView']);
    Route::post('/addproduct', [ProductDetailsController::class, 'addProduct']);
    Route::get('/product/{id}/bieudo', [ProductDetailsController::class, 'getChart']);
});

 