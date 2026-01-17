<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class ReportController extends Controller
{
    // Laporan penjualan
    // ReportController.php
public function sales()
{
    $transactions = Transaction::with('product')->get();

    return response()->json($transactions);
}

public function inventory()
{
    $products = \App\Models\Product::all();

    return response()->json($products);
}

}
