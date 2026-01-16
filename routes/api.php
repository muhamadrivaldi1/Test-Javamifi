<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController; 
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ReportController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);

Route::post('/transactions', [TransactionController::class, 'store']);

Route::get('/reports/sales', [ReportController::class, 'sales']);

