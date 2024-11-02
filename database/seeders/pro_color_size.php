<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class pro_color_size extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pro_color_size')->insert([
            'prod_id' => '1',
            'size_id' => '1',
            'color_id' => '1',
            'quantity_available' => '3',
        ]);

        DB::table('pro_color_size')->insert([
            'prod_id' => '1',
            'size_id' => '1',
            'color_id' => '2',
            'quantity_available' => '2',
        ]);

        DB::table('pro_color_size')->insert([
            'prod_id' => '1',
            'size_id' => '3',
            'color_id' => '1',
            'quantity_available' => '2',
        ]);

        DB::table('pro_color_size')->insert([
            'prod_id' => '1',
            'size_id' => '4',
            'color_id' => '2',
            'quantity_available' => '1',
        ]);
    }
}
