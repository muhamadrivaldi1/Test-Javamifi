<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function sales(){
        return response()->json(['message' => 'Sales report data']);
    }

    public function inventory(){
        return response()->json(['message' => 'Inventory report data']);
    }
}
