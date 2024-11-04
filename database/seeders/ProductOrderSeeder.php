<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_order')->insert([
            'order_id' => '1',
            'pro_color_size_id' => '2',
            'quantity' => '2'
        ]);

        DB::table('product_order')->insert([
            'order_id' => '1',
            'pro_color_size_id' => '3',
            'quantity' => '1'
        ]);

        DB::table('product_order')->insert([
            'order_id' => '2',
            'pro_color_size_id' => '4',
            'quantity' => '1'
        ]);

        DB::table('product_order')->insert([
            'order_id' => '3',
            'pro_color_size_id' => '2',
            'quantity' => '2'
        ]);

        DB::table('product_order')->insert([
            'order_id' => '4',
            'pro_color_size_id' => '5',
            'quantity' => '1'
        ]);
    }
}
