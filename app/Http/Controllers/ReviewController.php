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
            $status = "create-review";
        } catch(\Exception $e) {
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;

            $status = "error-review";
            return redirect()->route('shop.detail', [
                'id' => $request->shop_id,
                'status' => $status,
            ]);
        }

        return redirect()->route('shop.detail', [
            'id' => $request->shop_id,
            'status' => $status,
        ]);
    }

    public function edit($id)
    {
        $review = Review::find($id);

        return Inertia::render('Review/Edit', [
            'review' => $review,
        ]);
    }

    public function update(Request $request)
    {
        $review_shop_id = Review::where('id', $request->review_id)->value('shop_id');
        $detail_shop_id = Shop::where('id', $review_shop_id)->value('id');

        $user = auth()->user();

        $request->validate([
            'rate' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);

        DB::beginTransaction();
        try {
            $reviewModel = new Review();
            $reviewModel->updateReview($request);

            DB::commit();
            $status = "update-review";
        } catch(\Exception $e) {
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;

            $status = "error-update-review";

            return redirect()->route('shop.detail', [
                'id' => $detail_shop_id,
                'status' => $status,
            ]);
        }

        return redirect()->route('shop.detail', [
            'id' => $detail_shop_id,
            'status' => $status,
        ]);
    }
}
