<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        return response()->json(['message' => 'List of products']);
    }

    public function store(Request $request){
        return response()->json(['message' => 'Product created']);
    }

    public function show($id){
        return response()->json(['message' => "Details of product {$id}"]);
    }   
    public function update(Request $request, $id){
        return response()->json(['message' => "Product {$id} updated"]);
    }
}
