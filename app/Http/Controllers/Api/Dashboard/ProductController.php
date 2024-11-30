<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function addProduct(Request $request){
        $create = Product::create([
            'prod_name',
            'cost',
            'discount',
            'quantity_sold' => 0,
            'description' ,
            'category_type_id',
            'dateposted' => now()
        ]);

        if ($create){
            return 'Tao thanh cong';
        } else {
            return 'That bai';
        }
    }
}
