<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['product_id', 'quantity', 'total'];

    // Relasi ke produk
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected $casts = [
        'quantity' => 'integer',
        'total' => 'integer',
    ];
}
