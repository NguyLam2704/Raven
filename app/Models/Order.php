<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $primaryKey = 'order_id';
    protected $fillable = [
        'order_id',
        'datecreated',
        'status',
        'user_id',
        'payingmethod',
        'datepaid',
        'address',
        'detail_address',
    ];

    public $timestamps = false;
    // define relationship of user and order : 1 order belongsTo 1 user (One to many (inverse))
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id','user_id'); // the first user_id is in order table, the second user_id is in user table
    }
    // define relationship of bill and order : 1 order has 1 bill (One to one)
    public function bill(): HasOne
    {
        return $this->hasOne(Bill::class, 'order_id','order_id');
    }
}
