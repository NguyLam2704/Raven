<?php

use App\Http\Controllers\Api\Auth\AuthController;
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

use Illuminate\Http\Request;
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
    // Route::get('productOrder/{field1}/{field2}', [ProductOrderController::class, 'show']);
});

//auth
Route::post('/admin/auth/register', [AuthController::class, 'register']);
Route::post('/admin/auth/login', [AuthController::class, 'login']);
Route::post('/admin/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
