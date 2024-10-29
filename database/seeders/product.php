<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class product extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            'prod_name' =>'Spider Graphic Tee',
            'cost' => 350000,
            'discount' => 10,
            'quantity_sold' => 100,
            'description' => 'Spider Graphic Tee description',
            'category_type_id' => '1'
        ]);
    }
}
