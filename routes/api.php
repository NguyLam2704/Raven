<?php

use App\Http\Controllers\Api\V1\SizeController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Route::apiResource('size',SizeController::class);

//api/v1
Route::group(['prefix' => 'v1','namespace' => 'App\Http\Controllers\Api\V1'],function(){
    //add route here
    Route::apiResource('size',SizeController::class);
});

Route::post('/admin/auth/register',[AuthController::class, 'register']);
Route::post('/admin/auth/login',[AuthController::class, 'login']);


Route::post('/admin/auth/logout',[AuthController::class, 'logout'])->middleware('auth:sanctum');
