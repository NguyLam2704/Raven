<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;
    //Khai bao map table
    protected $table = 'colors';
    //Khai bao primary key
    protected $primaryKey = 'color_id';
    //Khai bao cac field co the thay doi
    protected $fillable = [
        'color_code',
        'color_name'
    ];

}
