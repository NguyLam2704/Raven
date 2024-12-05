<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProColorSize extends Model
{
    use HasFactory;
    protected $table = 'pro_color_size';
    protected $primaryKey = 'pro_color_size_id';
    protected $fillable = [
        'prod_id',
        'size_id',
        'color_id',
        'quantity_available'
    ];
    //define relationship of procolorsize and color
    public function color(): HasOne 
    {
        return $this->hasOne(Color::class,'color_id','color_id');
    }

    public function size(): HasOne
    {
        return $this->hasOne(Size::class,'size_id','size_id');
    }
}
