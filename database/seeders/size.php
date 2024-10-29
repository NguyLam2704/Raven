<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class size extends Seeder
{
    public function run(): void
    {
        DB::table('sizes')->insert([
            'size_code'=>'S'
        ]);
        
        DB::table('sizes')->insert([
            'size_code'=>'M'
        ]);

        DB::table('sizes')->insert([
            'size_code'=>'L'
        ]);

        DB::table('sizes')->insert([
            'size_code'=>'XL'
        ]);
    }
}
