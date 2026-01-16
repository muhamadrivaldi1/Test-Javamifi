<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index ()
    {
        return Product::all();
    }

    public function store (Request $request)
    {
        return Product::create($request->all());
    }
}
