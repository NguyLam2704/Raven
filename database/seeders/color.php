<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class color extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('colors')->insert([
            'color_code'=>'#FFFFFF',
            'color_name'=>'Trắng'
        ]);

        DB::table('colors')->insert([
            'color_code'=>'#1A1A19',
            'color_name'=>'Đen'
        ]);

        DB::table('colors')->insert([
            'color_code'=>'#133E87',
            'color_name'=>'Xanh'
        ]);

        DB::table('colors')->insert([
            'color_code'=>'#A91D3A',
            'color_name'=>'Đỏ'
        ]);

        DB::table('colors')->insert([
            'color_code'=>'#1E3E62',
            'color_name'=>'Xanh Navy'
        ]);

        DB::table('colors')->insert([
            'color_code'=>'#B4B4B8',
            'color_name'=>'Xám'
        ]);

        DB::table('colors')->insert([
            'color_code'=>'#F6E96B',
            'color_name'=>'Vàng'
        ]);

        DB::table('colors')->insert([
            'color_code'=>'#FF6500',
            'color_name'=>'Cam'
        ]);

        DB::table('colors')->insert([
            'color_code'=>'#65B741',
            'color_name'=>'Xanh lục'
        ]);
    }
}
