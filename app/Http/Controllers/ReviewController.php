<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Shop;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{
    public function create($id)
    {
        $shop = Shop::find($id);
        return Inertia::render('Review/Create', [
            'shop' => $shop,
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'rate' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);

        DB::beginTransaction();
        try {
            $reviewModel = new Review();
            $reviewModel->saveReview([
                'shop_id' => $request->shop_id,
                'user_id' => $user->id,
                'rate' => $request->rate,
                'comment' => $request->comment,
            ]);

            DB::commit();
        } catch(\Exception $e) {
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }

        return redirect()->route('shop.detail', [
            'id' => $request->shop_id,
        ]);
    }
}
