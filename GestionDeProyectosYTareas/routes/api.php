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
use App\Http\Controllers\Api\ProyectoApiController;
use App\Http\Controllers\Api\SprintApiController;


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

#region ADMINISTRADOR
//RUTAS AUTENTICACION ADMINISTRADOR
Route::post('register_administrador', [AdministradorAuthController::class, 'registerAdministrador']);
Route::post('login_administrador', [AdministradorAuthController::class,'loginAdministrador']);
//Middleware
//Route::get('ruta del navegador', [Controlador::class, 'metodo backend'])->middleware('auth:GUARD_DEL_USUARIO'); //carpeta config/auth.php
Route::get('profile_administrador', [AdministradorAuthController::class, 'profileAdministrador'])->middleware('auth:sanctum');
Route::get('indexUsuarios', [AdministradorController::class, 'indexUsuarios'])->middleware('auth:sanctum');
Route::get('showUsuarios/{rol}/{id}', [AdministradorController::class, 'showUsuarios'])->middleware('auth:sanctum');
Route::delete('eliminarUsuarios/{rol}/{id}', [AdministradorController::class, 'eliminarUsuarios'])->middleware('auth:sanctum');
Route::post('storeUsuarios',[AdministradorController::class, 'storeUsuarios'])->middleware('auth:sanctum');
Route::put('updateUsuarios/{rol}/{id}', [AdministradorController::class, 'updateUsuarios'])->middleware('auth:sanctum');
Route::get('indexProyectosAdmin', [AdministradorController::class, 'indexProyectosAdmin'])->middleware('auth:sanctum');
#endregion

#region PRODUCT OWNER
//RUTAS AUTENTICACIÓN PARA PRODUCT OWNER
//Route::post('ruta de la api con axios', [Controlador::class, 'metodo backend']);
Route::post('login_product_owner', [ProductOwnerAuthController::class,'loginProductOwner']);
//Route::get('profile_product_owner', [ProductOwnerAuthController::class, 'profileProductOwner']);
//MIDDLEWARE
Route::post('profile_product_owner', [ProductOwnerAuthController::class, 'actualizar_profileProductOwner'])->middleware('auth:sanctum');
Route::get('profile_product_owner', [ProductOwnerAuthController::class, 'obtenerDatosProfileProductOwner'])->middleware('auth:sanctum');


//RUTAS CRUD API PRODUCT OWNER , ya que el es el que crea proyectos
Route::get('listado_proyectos', [ProductOwnerApiController::class, 'index'])->middleware('auth:sanctum');
Route::post('crear_proyecto', [ProductOwnerApiController::class, 'store'])->middleware('auth:sanctum');
Route::get('mostrar_proyecto/{id}', [ProductOwnerApiController::class, 'show'])->middleware('auth:sanctum');
Route::put('actualizar_proyecto/{id}', [ProductOwnerApiController::class, 'update'])->middleware('auth:sanctum');
Route::delete('eliminar_proyecto/{id}', [ProductOwnerApiController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('tareas_product_owner', [TareaController::class, 'tareasProductOwner']);

//RUTAS CRUD PROYECTO PARA CREAR/MOSTRAR/ELIMINAR/ACTUALIZAR SPRINT
Route::get('listado_sprint/{proyecto}', [ProyectoApiController::class, 'index'])->middleware('auth:sanctum');
Route::post('crear_sprint/{proyecto}', [ProyectoApiController::class, 'store'])->middleware('auth:sanctum');
Route::get('mostrar_sprint/{proyecto}/{id}', [ProyectoApiController::class, 'show'])->middleware('auth:sanctum');
Route::put('actualizar_sprint/{proyecto}/{id}', [ProyectoApiController::class, 'update'])->middleware('auth:sanctum');
Route::delete('eliminar_sprint/{proyecto}/{id}', [ProyectoApiController::class, 'destroy'])->middleware('auth:sanctum');

//RUTAS CRUD TAREAS
Route::get('listado_tareas/{sprint}', [SprintApiController::class, 'index'])->middleware('auth:sanctum');
Route::post('crear_tarea/{sprint}', [SprintApiController::class, 'store'])->middleware('auth:sanctum');
Route::get('mostrar_tarea/{sprint}/{id}', [SprintApiController::class, 'show'])->middleware('auth:sanctum');
Route::put('actualizar_tarea/{sprint}/{id}', [SprintApiController::class, 'update'])->middleware('auth:sanctum');
Route::delete('eliminar_tarea/{sprint}/{id}', [SprintApiController::class, 'destroy'])->middleware('auth:sanctum');

//RUTAS PARA EL DESAROLLADOR PARA EL PRODUCT OWNER
//Ruta para mostrar el listado de desarolladores a la hora de elegir quién hace la tarea
Route::get('indexDesarrolladores', [DesarrolladorController::class, 'indexDesarrolladores']); 
//Ruta para asignar un proyecto al Desarrollador
Route::put('asignarProyecto/{id}',[DesarrolladorController::class, 'asignarProyecto']);
#endregion

#region DESAROLLADOR
//RUTAS AUTENTICACION DESARROLLADOR
Route::post('login_desarrollador', [DesarrolladorAuthController::class,'loginDesarrollador']);
//Middleware
Route::post('profile_desarrollador', [DesarrolladorAuthController::class, 'profileDesarrollador'])->middleware('auth:sanctum');
Route::get('indexTareasDesarrollador',[TareaController::class, 'indexTareasDesarrollador'])->middleware('auth:sanctum');
Route::get('showTareaDesarrollador/{id}', [TareaController::class, 'showTareaDesarrollador'])->middleware('auth:sanctum');
Route::put('updateTareaDesarrollador/{id}', [TareaController::class, 'updateTareaDesarrollador'])->middleware('auth:sanctum');
#endregion

#region COMENTARIO
Route::get('indexComentario/{id}', [ComentarioController::class, 'indexComentario'])->middleware('auth:sanctum');
Route::delete('eliminarComentario/{id}', [ComentarioController::class, 'eliminarComentario'])->middleware('auth:sanctum');
Route::post('guardarComentario',[ComentarioController::class, 'guardarComentario'])->middleware('auth:sanctum');
Route::put('updateComentario/{id}', [ComentarioController::class, 'updateComentario'])->middleware('auth:sanctum');
#endregion
