<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Throwable;

class CategoryController extends Controller
{
    public function index() {
        try {
            $categories = Category::find(2);

            return response()->json($categories, 200);

        } catch (Throwable $e) {
            report($e);

}

    }
}