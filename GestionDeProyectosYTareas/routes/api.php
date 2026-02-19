<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth_Api\AuthController;

//AUTH
use App\Http\Controllers\Auth_Api\AdministradorAuthController;
use App\Http\Controllers\Auth_Api\ProductOwnerAuthController;
use App\Http\Controllers\Auth_Api\DesarrolladorAuthController;
//API CRUD
use App\Http\Controllers\Api\ProductOwnerApiController;

use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\ProductOwnerController;
use App\Http\Controllers\DesarrolladorController;

use App\Http\Controllers\TareaController;
use App\Http\Controllers\ComentarioController;

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
Route::get('profile_administrador', [AdministradorAuthController::class, 'profileAdministrador'])->middleware('auth:sanctum');

//RUTAS PARA EL ADMINISTRADOR
Route::get('indexUsuarios', [AdministradorController::class, 'indexUsuarios']);
Route::get('showUsuarios/{rol}/{id}', [AdministradorController::class, 'showUsuarios']);
Route::delete('eliminarUsuarios/{rol}/{id}', [AdministradorController::class, 'eliminarUsuarios']);
Route::post('storeUsuarios',[AdministradorController::class, 'storeUsuarios']);
Route::put('updateUsuarios/{rol}/{id}', [AdministradorController::class, 'updateUsuarios']);



//RUTAS AUTENTICACIÓN PARA PRODUCT OWNER
//Route::post('ruta de la api con axios', [Controlador::class, 'metodo backend']);
Route::post('register_product_owner', [ProductOwnerAuthController::class, 'registerProductOwner']);
Route::post('login_product_owner', [ProductOwnerAuthController::class,'loginProductOwner']);
Route::post('profile_product_owner', [ProductOwnerAuthController::class, 'profileProductOwner']);
//Middleware
Route::post('profile_product_owner', [ProductOwnerAuthController::class, 'profileProductOwner'])->middleware('auth:sanctum');

//RUTAS CRUD API PRODUCT OWNER
Route::get('listado_proyectos', [ProductOwnerApiController::class, 'index']);
Route::post('crear_proyecto', [ProductOwnerApiController::class, 'store']);
Route::get('mostrar_proyectos/{id}', [ProductOwnerApiController::class, 'show']);
Route::put('actualizar_proyectos/{id}', [ProductOwnerApiController::class, 'update']);
Route::delete('eliminar_proyectos/{id}', [ProductOwnerApiController::class, 'destroy']);

//RUTAS AUTENTICACION DESARROLLADOR
Route::post('login_desarrollador', [DesarrolladorAuthController::class,'loginDesarrollador']);
Route::post('profile_desarrollador', [DesarrolladorAuthController::class, 'profileDesarrollador']);
//Middleware
Route::post('profile_desarrollador', [DesarrolladorAuthController::class, 'profileDesarrollador'])->middleware('auth:sanctum');

//RUTAS PARA EL DESAROLLADOR PARA EL PRODUCT OWNER
Route::get('indexUsuarios', [DesarrolladorController::class, 'indexUsuarios']);
Route::put('asignarProyecto/{id}',[DesarrolladorController::class, 'asignarProyecto']);

//Rutas para proyecto
//Route::post('ruta', [Controlador::class, 'metodo']);
Route::post('proyecto', [ProductOwnerController::class, 'store']);
Route::get('mostrar_proyecto', [ProductOwnerController::class, 'show']);

//RUTAS PARA TAREAS DE PARTE DEL DESAROLLADOR
Route::get('indexTareaParaUsuario/{id}',[TareaController::class, 'indexTareaParaUsuario']);
Route::get('indexTareaParaSprint/{id}',[TareaController::class, 'indexTareaParaSprint']);
Route::get('showTarea/{id}',[TareaController::class, 'showTarea']);
Route::put('updateTarea/{id}',[DesarrolladorController::class, 'updateTarea']);

//RUTAS COMENTARIOS
Route::get('indexComentario', [ComentarioController::class, 'indexComentario']);
Route::get('showComentario/{id}', [ComentarioController::class, 'showComentario']);
Route::delete('eliminarComentario/{id}', [ComentarioController::class, 'eliminarComentario']);
Route::post('guardarComentario',[ComentarioController::class, 'guardarComentario']);
Route::put('updateComentario/{id}', [ComentarioController::class, 'updateComentario']);
