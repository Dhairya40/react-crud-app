<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/user/data', [UserController::class,'index']) ;
Route::get('/user/search/{key?}', [UserController::class,'searchData']) ;
Route::get('/user/data/{id?}', [UserController::class,'edit']) ;
Route::post('/user/add', [UserController::class,'store']) ;
Route::put('/user/update', [UserController::class,'update']) ;
Route::delete('/user/delete/{id}', [UserController::class,'destroy']) ;
Route::post('/user/register', [UserController::class,'store']) ;
Route::post('/user/login', [UserController::class,'login']) ;
Route::middleware('auth:sanctum')->post('/user/create', 'Api/UserController@index') ;
