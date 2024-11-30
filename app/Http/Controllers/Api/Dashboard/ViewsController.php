<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ViewsController extends Controller
{
    public function addView()
    {
        $row = DB::table('webviews')->orderByDesc('id')->first();
        $now = now();
        
        $latest = Carbon::create($row->created_at);
        if ( $latest->toDateString() != $now->toDateString()){
            DB::table('webviews')->insert([
                'created_at' => $now,
                'views' => 1
            ]);
        } else {
            DB::table('webviews')->where('id',$row->id)->update([
                'views' => $row->views + 1
            ]);
        }
        return ['message' => 'Cập nhật thành công'];
    }
}
