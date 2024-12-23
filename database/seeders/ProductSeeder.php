<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            'prod_name' =>'Spider Graphic Tee',
            'cost' => 350000,
            'discount' => 10,
            'quantity_sold' => 100,
            'description' => 'Spider Graphic Tee description',
            'category_type_id' => '1',
            'dateposted' => '2024-10-15 04:05:06'
        ]);
    }
}
