<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'user_id',
        'rate',
        'comment',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function saveReview($data)
    {
        $this->shop_id = $data['shop_id'];
        $this->user_id = $data['user_id'];
        $this->rate = $data['rate'];
        $this->comment = $data['comment'];
        $this->save();

        return $this;
    }
}
