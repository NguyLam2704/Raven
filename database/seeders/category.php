<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class category extends Seeder
{
    public function run(): void
    {
        DB::table('category')->insert([
            'category_name' => 'Áo'
        ]);

        DB::table('category')->insert([
            'category_name' => 'Quần'
        ]);

        DB::table('category')->insert([
            'category_name' => 'Phụ kiện'
        ]);

    }
}
