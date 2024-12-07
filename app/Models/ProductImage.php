<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;
    protected $table = 'product_images';
    protected $primaryKey = 'prod_img_id';
    protected $fillable = [
        'prod_id',
        'is_primary',
        'image'
    ];
}
