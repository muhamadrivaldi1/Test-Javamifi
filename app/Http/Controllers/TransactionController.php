<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function store(Request $request){
        return response()->json(['message' => 'Transaction recorded']);
    }

    public function show($id){
        return response()->json(['message' => "Details of transaction {$id}"]);
    }   
}
