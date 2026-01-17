<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Product;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('product')->get();
        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        // Cek stock cukup
        if ($validated['quantity'] > $product->stock) {
            return response()->json(['error' => 'Stock not enough'], 400);
        }

        // Hitung total
        $total = $product->price * $validated['quantity'];

        // Kurangi stock
        $product->stock -= $validated['quantity'];
        $product->save();

        $transaction = Transaction::create([
            'product_id' => $product->id,
            'quantity' => $validated['quantity'],
            'total' => $total
        ]);

        return response()->json($transaction, 201);
    }
}
