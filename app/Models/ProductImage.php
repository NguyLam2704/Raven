<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductImage extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'product_images';
    protected $primaryKey = 'prod_img_id';
    protected $fillable = [
        'prod_id',
        'is_primary',
        'image'
    ];
}
