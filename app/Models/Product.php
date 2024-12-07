<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'products';
    protected $primaryKey = 'prod_id';
    protected $fillable = [
        'prod_name',
        'cost',
        'discount',
        'quantity_sold',
        'description',
        'dateposted'
    ];
    public $timestamps = false;
    //Create relationship to ProductImage : 1 product - hasMany productImage
    // second prod_id is foreigin key in table product_image 
    // first prod_id is key in table product
    public function productImage(): HasMany
    {
      return $this->hasMany(ProductImage::class, 'prod_id', 'prod_id');
    } 
    //define relationship of product and pro_color_size
    public function proColorSize(): HasMany
    {
      return $this->hasMany(ProColorSize::class, 'prod_id', 'prod_id');
    }
}
