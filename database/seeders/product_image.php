<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class product_image extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_images')->insert([
            'image' => 'https://i.imgur.com/qtVk7Xf.jpeg',
            'prod_id' => '1',
            'is_primary' => true
        ]);
        
        DB::table('product_images')->insert([
            'image' => 'https://i.imgur.com/HFl1lBk.jpeg',
            'prod_id' => '1',
            'is_primary' => false
        ]);

        DB::table('product_images')->insert([
            'image' => 'https://i.imgur.com/0O4qwZT.jpeg',
            'prod_id' => '1',
            'is_primary' => false
        ]);

        DB::table('product_images')->insert([
            'image' => 'https://i.imgur.com/Gzka7bV.jpeg',
            'prod_id' => '1',
            'is_primary' => false
        ]);
    }
}
