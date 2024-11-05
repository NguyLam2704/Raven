<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register
    public function register(Request $request){
        
        $fields = $request->validate([
            'name' => 'required|max:100',
            'account' => 'required|max:40|unique:admins',
            'phoneNumber' => 'numeric',
            'email' => 'required|email',
            'password' => 'required|confirmed'
        ]);

        $fields['password'] = Hash::make($fields['password']);

        $admin = Admin::create($fields);
        // $admin->password = Hash::make($request->password);
        // $admin->save();

        return [
            'user' => $admin->name
        ];
    }

    public function login(Request $request){
        $request->validate([
            'account' => 'required|max:40',
            'password' => 'required'
        ]);

        $admin = Admin::where('account', $request->account)->first();

        if (!$admin || !Hash::check($request->password, $admin->password))
        {
            return [
                'errors' => [
                    'password' => ['Tài khoản hoặc mật khẩu không chính xác!']
                ] 
            ];
        }
    
        $token = $admin->createToken($request->account);
        
        return [
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return [
            'message' => 'Logout'
        ];
    }
}
