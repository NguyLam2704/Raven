<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class bill extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('bills')->insert([
           'order_id'=>'1',
           'total_cost'=>1050000,
           'detail'=>'0384666444 - DOAN NGUYEN LAM'
        ]);

        DB::table('bills')->insert([
            'order_id'=>'2',
            'total_cost'=>350000,
            'detail'=>'0123456789 - THACH MINH LUAN'
         ]);

         DB::table('bills')->insert([
            'order_id'=>'3',
            'total_cost'=>700000,
            'detail'=>'0011223344 - THACH LUAN'
         ]);

         DB::table('bills')->insert([
            'order_id'=>'4',
            'total_cost'=>350000,
            'detail'=>'0011223344 - THACH LUAN'
         ]);
    }
}
