<?php

namespace App\Http\Controllers\Api\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class UserDetailsController extends Controller
{
    public function UserDetails($id){
        // Lay thong tin nguoi dung
        $user = DB::table('users')->where('user_id',$id)->get();
        $count = DB::table('orders')->where('user_id',$id)->count();
        $address = DB::table('orders')->where('user_id',$id)->get('address')->first();
        $user[0]->address = $address->address;
        $user[0]->count = $count;

        // Lay thong tin don hang
        $order = DB::table('orders')->where('user_id',$id)->get();
        return [
            'user' => $user,
            'order' => $order
        ];
    }
}
