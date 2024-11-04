<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class TestSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('category_type')->insert([
            'category_type_name' => 'Áo thun',
            'category_id' => '1'
        ]);

        DB::table('category_type')->insert([
            'category_type_name' => 'Áo polo',
            'category_id' => '1'
        ]);
        
        DB::table('category_type')->insert([
            'category_type_name' => 'Áo khoác',
            'category_id' => '1'
        ]);

        DB::table('category_type')->insert([
            'category_type_name' => 'Áo sweater',
            'category_id' => '1'
        ]);

        DB::table('category_type')->insert([
            'category_type_name' => 'Áo sơ mi',
            'category_id' => '1'
        ]);

        DB::table('category_type')->insert([
            'category_type_name' => 'Quần dài',
            'category_id' => '2'
        ]);

        DB::table('category_type')->insert([
            'category_type_name' => 'Quần ngắn',
            'category_id' => '2'
        ]);

        DB::table('category_type')->insert([
            'category_type_name' => 'Cặp',
            'category_id' => '3'
        ]);

        DB::table('category_type')->insert([
            'category_type_name' => 'Túi xách',
            'category_id' => '3'
        ]);

        DB::table('category_type')->insert([
            'category_type_name' => 'Ví',
            'category_id' => '3'
        ]);

        DB::table('category_type')->insert([
            'category_type_name' => 'Nón',
            'category_id' => '3'
        ]);
    }
}
