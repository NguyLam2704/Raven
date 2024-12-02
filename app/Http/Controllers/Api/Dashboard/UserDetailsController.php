<?php

namespace App\Http\Controllers\Api\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class UserDetailsController extends Controller
{
    public function UserDetails($id)
    {
        // Lay thong tin nguoi dung
        $user = DB::table('users')->where('user_id', $id)->get();
        $count = DB::table('orders')->where('user_id', $id)->count();
        $address = DB::table('orders')->where('user_id', $id)->orderByDesc('datecreated')->get('address')->first();
        $user[0]->address = $address->address;
        $user[0]->count = $count;

        // Lay thong tin don hang
        $order = DB::table('orders')->where('user_id', $id)->get();
        $products = [];
        foreach ($order as $element) {
            $prod_color_size = DB::table('product_order')
                ->where('order_id', $element->order_id)
                ->join('pro_color_size', 'product_order.pro_color_size_id', '=', 'pro_color_size.pro_color_size_id')
                ->join('products', 'pro_color_size.prod_id', '=', 'products.prod_id')
                ->get(['order_id', 'quantity', 'product_order.cost', 'discount']);
            $products[] = $prod_color_size;
        }

        return [
            'user' => $user,
            'order' => $order,
            'products' => $products
        ];
    }
}
