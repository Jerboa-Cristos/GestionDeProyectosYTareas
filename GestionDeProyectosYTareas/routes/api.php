<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth_Api\AuthController;


use App\Http\Controllers\Auth_Api\AdministradorAuthController;
use App\Http\Controllers\Auth_Api\ProductOwnerAuthController;
use App\Http\Controllers\Auth_Api\DesarrolladorAuthController;

use App\Http\Controllers\AdministradorController;

Route::get('user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Rutas para autenticación ejemplo del tutorial yotube , eliminar despues
//Route::post('register', [AuthController::class, 'register_user']);

//RUTAS AUTENTICACION ADMINISTRADOR
Route::post('register_administrador', [AdministradorAuthController::class, 'registerAdministrador']);
Route::post('login_administrador', [AdministradorAuthController::class,'loginAdministrador']);
Route::post('profile_administrador', [AdministradorAuthController::class, 'profileAdministrador']);
//Middleware
//Route::get('ruta del navegador', [Controlador::class, 'metodo backend'])->middleware('auth:GUARD_DEL_USUARIO'); //carpeta config/auth.php
Route::get('profile_administrador', [AdministradorAuthController::class, 'profileAdministrador'])->middleware('auth:administrador');

//RUTAS AUTENTICACIÓN PARA PRODUCT OWNER
//Route::post('ruta del navegador', [Controlador::class, 'metodo backend']);
Route::post('register_product_owner', [ProductOwnerAuthController::class, 'registerProductOwner']);
Route::post('login_product_owner', [ProductOwnerAuthController::class,'loginProductOwner']);
Route::post('profile_product_owner', [ProductOwnerAuthController::class, 'profileProductOwner']);
//Middleware
Route::get('profile_product_owner', [ProductOwnerAuthController::class, 'profileProductOwner'])->middleware('auth:product_owner');

//RUTAS AUTENTICACION DESARROLLADOR
Route::post('register_desarrollador', [DesarrolladorAuthController::class, 'registerDesarrollador']);
Route::post('login_desarrollador', [DesarrolladorAuthController::class,'loginDesarrollador']);
Route::post('profile_desarrollador', [DesarrolladorAuthController::class, 'profileDesarrollador']);
//Middleware
Route::get('profile_desarrollador', [DesarrolladorAuthController::class, 'profileDesarrollador'])->middleware('auth:desarrollador');

//Rutas para proyecto
//Route::post('ruta', [Controlador::class, 'metodo']);
Route::post('proyecto', [ProductOwnerController::class, 'store']);

//RUTAS PARA EL ADMINISTRADOR
Route::get('indexUsuarios', [AdministradorController::class, 'indexUsuarios']);
Route::get('showUsuarios/{id}', [AdministradorController::class, 'showUsuarios']);
Route::delete('eliminarUsuarios/{id}', [AdministradorController::class, 'eliminarUsuario']);
Route::post('storeUsuarios',[AdministradorController::class, 'storeUsuarios']);
Route::put('updateUsuarios/{id}', [AdministradorController::class, 'updateUsuarios']);

Route::get('editUsarios/{id}',[AdministradorController::class, 'editUsuarios']);