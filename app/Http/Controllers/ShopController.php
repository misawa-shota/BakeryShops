<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::with('reviews')->get();
        // foreach($shops as $shop){
        //     foreach($shop->reviews as $review){
        //         dd($review);
        //     }
        // }

        return Inertia::render('Home', [
            'shops' => $shops,
        ]);
    }
}
