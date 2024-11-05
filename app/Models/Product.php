<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
