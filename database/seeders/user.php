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
            'email'=>'doannguyenlambt1@gmail.com',
            'datefirstbuy'=> '2024-10-20 04:05:06'
        ]);

        DB::table('users')->insert([
            'phonenumber'=>'0123456789',
            'email'=>'mluan.tml@gmail.com',
            'datefirstbuy'=> '2024-10-25 09:30:06'
        ]);

        DB::table('users')->insert([
            'phonenumber'=>'0011223344',
            'email'=>'22520827@gm.uit.edu.vn',
            'datefirstbuy'=> '2024-10-20 05:00:06'
        ]);
    }
}
