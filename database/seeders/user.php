<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class user extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            'phonenumber'=>'0384666444',
            'email'=>'doannguyenlambt1@gmail.com'
        ]);

        DB::table('users')->insert([
            'phonenumber'=>'0123456789',
            'email'=>'mluan.tml@gmail.com'
        ]);

        DB::table('users')->insert([
            'phonenumber'=>'0011223344',
            'email'=>'22520827@gm.uit.edu.vn'
        ]);
    }
}
