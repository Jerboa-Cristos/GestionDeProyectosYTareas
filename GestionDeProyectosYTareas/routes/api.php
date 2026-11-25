<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth_Api\AuthController;

//AUTH
use App\Http\Controllers\Auth_Api\AdministradorAuthController;
use App\Http\Controllers\Auth_Api\ProductOwnerAuthController;
use App\Http\Controllers\Auth_Api\DesarrolladorAuthController;
//API CRUD
use App\Http\Controllers\ProductOwnerController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\DesarrolladorController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\ComentarioController;


Route::get('user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Route::post('register', [AuthController::class, 'register_user']);

#region ADMINISTRADOR
//RUTAS AUTENTICACION ADMINISTRADOR
Route::post('registerAdministrador', [AdministradorAuthController::class, 'registerAdministrador'])->middleware(['auth:sanctum']);
Route::post('loginAdministrador', [AdministradorAuthController::class,'loginAdministrador']);
//Middleware
//Route::get('ruta del navegador', [Controlador::class, 'metodo backend'])->middleware('auth:GUARD_DEL_USUARIO'); //carpeta config/auth.php

Route::post('profileAdministrador', [AdministradorAuthController::class, 'profileAdministrador'])->middleware(['auth.admin', 'auth:sanctum']);
Route::get('indexUsuarios', [AdministradorController::class, 'indexUsuarios'])->middleware(['auth:sanctum']);
Route::get('showUsuarios/{rol}/{id}', [AdministradorController::class, 'showUsuarios'])->middleware(['auth.admin', 'auth:sanctum']);
Route::delete('eliminarUsuarios/{rol}/{id}', [AdministradorController::class, 'eliminarUsuarios'])->middleware(['auth.admin', 'auth:sanctum']);
Route::post('storeUsuarios',[AdministradorController::class, 'storeUsuarios'])->middleware(['auth.admin', 'auth:sanctum']);
Route::put('updateUsuarios/{rol}/{id}', [AdministradorController::class, 'updateUsuarios'])->middleware(['auth.admin', 'auth:sanctum']);
Route::get('indexProyectosAdmin', [AdministradorController::class, 'indexProyectosAdmin'])->middleware(['auth.admin', 'auth:sanctum']);
#endregion

#region PRODUCT OWNER
//RUTAS AUTENTICACIÓN PARA PRODUCT OWNER
//Route::post('ruta de la api con axios', [Controlador::class, 'metodo backend']);
Route::post('loginProductOwner', [ProductOwnerAuthController::class,'loginProductOwner']);
//Route::get('profile_product_owner', [ProductOwnerAuthController::class, 'profileProductOwner']);
//MIDDLEWARE
Route::post('profileProductOwner', [ProductOwnerAuthController::class, 'actualizar_profileProductOwner'])->middleware(['auth.po', 'auth:sanctum']);
Route::get('profileProductOwner', [ProductOwnerAuthController::class, 'obtenerDatosProfileProductOwner'])->middleware(['auth.po', 'auth:sanctum']);

//RUTAS CRUD API PRODUCT OWNER , ya que el es el que crea proyectos
Route::get('listadoProyectos', [ProductOwnerController::class, 'index'])->middleware(['auth.po', 'auth:sanctum']);
Route::post('crearProyecto', [ProductOwnerController::class, 'store'])->middleware(['auth.po', 'auth:sanctum']);
Route::get('mostrarProyecto/{id}', [ProductOwnerController::class, 'show'])->middleware(['auth.po', 'auth:sanctum']);
Route::put('actualizarProyecto/{id}', [ProductOwnerController::class, 'update'])->middleware(['auth.po', 'auth:sanctum']);
Route::delete('eliminarProyecto/{id}', [ProductOwnerController::class, 'destroy'])->middleware(['auth.po', 'auth:sanctum']);

Route::get('tareasProductOwner', [TareaController::class, 'tareasProductOwner']);

//RUTAS CRUD PROYECTO PARA CREAR/MOSTRAR/ELIMINAR/ACTUALIZAR SPRINT
Route::get('listadoSprint/{proyecto}', [ProyectoController::class, 'index'])->middleware(['auth.po', 'auth:sanctum']);
Route::post('crearSprint/{proyecto}', [ProyectoController::class, 'store'])->middleware(['auth.po', 'auth:sanctum']);
Route::get('mostrarSprint/{proyecto}/{id}', [ProyectoController::class, 'show'])->middleware(['auth.po', 'auth:sanctum']);
Route::put('actualizarSprint/{proyecto}/{id}', [ProyectoController::class, 'update'])->middleware(['auth.po', 'auth:sanctum']);
Route::delete('eliminarSprint/{proyecto}/{id}', [ProyectoController::class, 'destroy'])->middleware(['auth.po', 'auth:sanctum']);

//RUTAS CRUD TAREAS
Route::get('listadoTareas/{sprint}', [SprintController::class, 'index'])->middleware(['auth.po', 'auth:sanctum']);
Route::post('crearTarea/{sprint}', [SprintController::class, 'store'])->middleware(['auth.po', 'auth:sanctum']);
Route::get('mostrarTarea/{sprint}/{id}', [SprintController::class, 'show'])->middleware(['auth.po', 'auth:sanctum']);
Route::put('actualizarTarea/{sprint}/{id}', [SprintController::class, 'update'])->middleware(['auth.po', 'auth:sanctum']);
Route::delete('eliminarTarea/{sprint}/{id}', [SprintController::class, 'destroy'])->middleware(['auth.po', 'auth:sanctum']);

//RUTAS PARA EL DESAROLLADOR PARA EL PRODUCT OWNER
//Ruta para mostrar el listado de desarolladores a la hora de elegir quién hace la tarea
Route::get('indexDesarrolladores', [DesarrolladorController::class, 'indexDesarrolladores']) ->middleware(['auth.po', 'auth:sanctum']); 
#endregion

#region DESAROLLADOR
//RUTAS AUTENTICACION DESARROLLADOR
Route::post('loginDesarrollador', [DesarrolladorAuthController::class,'loginDesarrollador']);
//Middleware
Route::post('profileDesarrollador', [DesarrolladorAuthController::class, 'profileDesarrollador'])->middleware(['auth.dev', 'auth:sanctum']);
Route::get('indexTareasDesarrollador',[TareaController::class, 'indexTareasDesarrollador'])->middleware(['auth.dev', 'auth:sanctum']);
Route::get('showTareaDesarrollador/{id}', [TareaController::class, 'showTareaDesarrollador'])->middleware(['auth.dev', 'auth:sanctum']);
Route::put('updateTareaDesarrollador/{id}', [TareaController::class, 'updateTareaDesarrollador'])->middleware(['auth.dev', 'auth:sanctum']);
#endregion

#region COMENTARIO
Route::get('indexComentario/{id}', [ComentarioController::class, 'indexComentario'])->middleware('auth:sanctum');
Route::delete('eliminarComentario/{id}', [ComentarioController::class, 'eliminarComentario'])->middleware('auth:sanctum');
Route::post('guardarComentario',[ComentarioController::class, 'guardarComentario'])->middleware('auth:sanctum');
Route::put('updateComentario/{id}', [ComentarioController::class, 'updateComentario'])->middleware('auth:sanctum');
#endregion
