<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\GetPasswordMail;
use App\Models\Admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        $email = $request->validate([
            'email' => 'required|email'
        ], [
            'email.required' => 'hahaha'
        ]);
        $admin = Admin::where('email', $email)->first();

        if (!$admin) {
            return [
                'errors' => [
                    'email' => ['Email không tồn tại!']
                ]
            ];
        }

        $token = bin2hex(random_bytes(10));

        $exist = DB::table('resetpassword_tokens')->where('gmail', $email)->first();
        if ($exist) {
            DB::table('resetpassword_tokens')->where('gmail', $email)->update([
                'expiration_time' => now()->addMinutes(10),
                'token' => $token
            ]);
        } else {
            DB::table('resetpassword_tokens')->insert([
                'expiration_time' => now()->addMinutes(10),
                'gmail' => $request->email,
                'token' => $token
            ]);
        }



        $url = url('/reset_password', $token);

        Mail::to($email)->sendNow(new GetPasswordMail($admin->name, $url));
        return [
            $url
        ];
    }

    public function resetpassword(Request $request)
    {
        $row = DB::table('resetpassword_tokens')->where('token', $request->input('token'))->first();
        if (!$row) {
            abort(404);
        }

        if (now() > $row->expiration_time) {
            abort(404);
        }

        return[ 'gmail' => $row->gmail];
    }

    public function changepass(Request $request)
    {
        $request->validate([
            'new_password' => 'required|min:6'
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

        $admin = Admin::where('email', $request->gmail)->first();
        $admin->password = Hash::make($request->new_password);
        $admin->save();
        return abort(200);
    }
}
