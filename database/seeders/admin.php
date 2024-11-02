<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class admin extends Seeder
{
    public function run(): void
    {
        DB::table('admins')->insert([
            'account' => 'admin',
            'password' => '12345678',
        ]);
    }
}
