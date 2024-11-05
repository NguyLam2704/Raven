<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('/admin/auth/login');
// });

Route::view('/{path?}', '/admin/auth/login');