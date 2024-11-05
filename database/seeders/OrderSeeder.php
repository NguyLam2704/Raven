<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert([
            'datecreated'=>'2024-10-20 04:05:06',
            'status'=>'1',
            'user_id'=>'1',
            'datepaid'=>'2024-10-20 05:05:00',
            'payingmethod'=>true,
            'address'=>'phường Hiệp Phú, Thành phố Thủ Đức, TP.Hồ Chí Minh',
            'detail_address'=>'35/18 đường 904'
        ]);

        DB::table('orders')->insert([
            'datecreated'=>'2024-10-25 09:30:06',
            'status'=>'1',
            'user_id'=>'2',
            'datepaid'=>'2024-10-30 09:30:00',
            'payingmethod'=>false,
            'address'=>'Xã Tân Triều, Huyện Thanh Trì, Hà Nội',
            'detail_address'=>'35 ngõ 83 Tân Triều'
        ]);

        DB::table('orders')->insert([
            'datecreated'=>'2024-10-20 05:00:06',
            'status'=>'1',
            'user_id'=>'3',
            'datepaid'=>'2024-10-23 10:00:00',
            'payingmethod'=> false,
            'address'=>'Dĩ An, Bình Dương',
            'detail_address'=>'KTX khu B, đường Mạc Đĩnh Chi'
        ]);

        DB::table('orders')->insert([
            'datecreated'=>'2024-10-30 01:00:00',
            'status'=>'1',
            'user_id'=>'3',
            'datepaid'=>'2024-10-30 01:20:00',
            'payingmethod'=>'true',
            'address'=>'Dĩ An, Bình Dương',
            'detail_address'=>'KTX khu B, đường Mạc Đĩnh Chi'
        ]);

        
    }
}
