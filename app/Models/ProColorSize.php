<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProColorSize extends Model
{
    use HasFactory;
    protected $table = 'pro_color_size';
    protected $primaryKey = 'pro_color_size_id';
}
