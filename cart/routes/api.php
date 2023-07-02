<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
});
Route::post('/register',[AuthController::class,'register']);
Route::post('/adminlogout',[AuthController::class,'logout']);

// product controller
Route::resource('/product', ProductController::class);
Route::get('/search',[ProductController::class,'search']);
/* category route */
Route::post('/addcategory',[CategoryController::class,'store']);
Route::get('/categories',[CategoryController::class, 'index']);
Route::get('/categories/{category}',[CategoryController::class,'show']);
Route::put('/categories/{category}',[CategoryController::class, 'update']);
Route::delete('/categories/{category}',[CategoryController::class, 'destroy']);
});

Route::post('/adminlogin',[AuthController::class,'login']);
