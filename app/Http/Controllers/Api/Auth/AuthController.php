<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;


class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {

        $fields = $request->validate([
            'name' => 'required|max:100',
            'account' => 'required|max:40|unique:admins',
            'phoneNumber' => 'digits:10',
            'email' => 'required|email',
            'avtImg' => '',
            'password' => 'required|confirmed'
        ]);

        $fields['password'] = Hash::make($fields['password']);
        $admin = Admin::create($fields);

        return [
            'user' => $admin->name
        ];
    }

    public function login(Request $request)
    {
        
        $request->validate([
            'account' => 'required|max:40',
            'password' => 'required'
        ],['']);

        $admin = Admin::where('account', $request->account)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return [
                'errors' => [
                    'password' => ['Tài khoản hoặc mật khẩu không chính xác!']
                ]
            ];
        }

        $token = $admin->createToken($request->account);

        return [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'phoneNumber' => $admin->phoneNumber,
            ],

            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => 'Logout'
        ];
    }

    public function changePass(Request $request, $id)
    {
        $request->validate([
            'old_password' => 'required|min:6',
            'new_password' => 'required|min:6',
        ],[
            'required' => 'Không được để trống mật khẩu',
            'min' => 'Mật khẩu phải dài hơn hoặc bằng 6 kí tự'
        ]);

        if ($request->new_password != $request->new_password_confirmation){
            return[
                'errors' => [
                    'new_password_confirmation' => 'Nhập lại mật khẩu không chính xác'
                ]
            ];
        }

        $admin = Admin::where('id', $id)->first();
        if (!$admin || !Hash::check($request->old_password, $admin->password)) {
            return [
                'errors' => [
                    'old_password' => ['Mật khẩu không chính xác!']
                ]
            ];
        } else {
            $admin->password = Hash::make($request->new_password);
            $admin->save();
            return [
                'ok' => 'ok'
            ];
        }
    }

    
}
