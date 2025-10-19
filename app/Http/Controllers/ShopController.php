<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Review;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::with('reviews')->get();

        return Inertia::render('Home', [
            'shops' => $shops,
        ]);
    }

    public function detail($id)
    {
        $shop = Shop::with('reviews.user')->find($id);

        return Inertia::render('Shop/Detail', [
            'shop' => $shop,
        ]);
    }
}
