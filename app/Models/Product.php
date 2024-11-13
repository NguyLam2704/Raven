<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Product extends Model
{
    use HasFactory;
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

    //Create relationship to ProductImage
    // first prod_id is foreigin key in product_image table
    // second prod_id is key in table product
    public function productImage(): HasMany
    {
      return $this->hasMany(ProductImage::class, 'prod_id', 'prod_id');
    } 

    // public function proColorSize(): MorphMany
    // {
    //     return $this->morphMany(ProColorSize::class,'')
    // }
}
