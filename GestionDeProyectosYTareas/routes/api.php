<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth_Api\AuthController;
use App\Http\Controllers\ProductOwnerController;

Route::get('user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Rutas para autenticación
//Route::post('ruta del navegador', [Controlador::class, 'metodo']);
Route::post('register', [AuthController::class, 'register_user']);

//Ruta para registrar un nuevo Product Owner
Route::post('register_product_owner', [AuthController::class, 'registerProduct_Owner']);
Route::post('login', [AuthController::class,'login']);
Route::post('profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');


//Rutas para proyecto
//Route::post('ruta', [Controlador::class, 'metodo']);
Route::post('proyecto', [ProductOwnerController::class, 'store']);
