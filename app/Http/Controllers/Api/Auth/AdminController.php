<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function getAdmin(Request $request, $id){


        dd($request);
        
        return [
            'request' =>$request
        ] ;
    }

    public function updateAdmin(Request $request, $id){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phoneNumber' => 'required|digits:10',
        ]);

        $admin = Admin::find($id);
        if (!$admin){
            return [
                'error' => 'Khong co ng dung'
            ];
        } else {

            $admin->name = $request->name;
            $admin->email = $request->email;
            $admin->phoneNumber = $request->phoneNumber;
            $admin->save();
            return [
                'admin' =>$admin
            ] ;
        }
    }
}
