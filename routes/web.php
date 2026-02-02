<?php
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\ProductOwnerController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});



//RUTAS
//Login

//Dashboard (Panel de control):
//  Administrador
//  Desarrollador


//  Product Owner
Route::get('index', [ProductOwnerController::class, 'index'])->name('index');
Route::get('create', [ProductOwnerController::class, 'create'])->name('cargarFormulario');
Route::post('store', [ProductOwnerController::class, 'store'])->name('guardar');
Route::get('edit/{id}', [ProductOwnerController::class, 'edit'])->name('editar');
Route::get('show/{id}', [ProductOwnerController::class, 'show'])->name('mostrar');
Route::put('update/{id}', [ProductOwnerController::class, 'update'])->name('actualizar');
Route::delete('destroy/{id}', [ProductOwnerController::class, 'destroy'])->name('eliminar');


//Administrador
Route::get('index_Admin', [AdministradorController::class, 'indexDesarrollador'])->name('Index_Desarrollador');
Route::get('index_Admin', [AdministradorController::class, 'indexProductOwner'])->name('Index_Product_Owner');

Route::get('create_Admin',[AdministradorController::class, 'create'])->name('crear_users');

Route::post('store_Admin',[AdministradorController::class, 'guardarDesarrollador'])->name('Store_Desarrollador');
Route::post('store_Admin',[AdministradorController::class, 'guardarProductOwner'])->name('Store_Product_Owner');

Route::get('edit_Admin/{id}', [AdministradorController::class, 'editDesarrollador'])->name('Edit_Desarrollador');
Route::get('edit_Admin/{id}', [AdministradorController::class, 'editProductOwner'])->name('Edit_Product_Owner');

Route::get('show_Admin/{id}', [AdministradorController::class, 'showDesarrollador'])->name('show_Desarrollador');
Route::get('show_Admin/{id}', [AdministradorController::class, 'showProductOwner'])->name('show_Product_Owner');

Route::put('update_Admin/{id}', [AdministradorController::class, 'updateDesarrollador'])->name('update_Desarrollador');
Route::put('update_Admin/{id}', [AdministradorController::class, 'updateProductOwner'])->name('update_Product_Owner');

Route::delete('destroy_Admin/{id}', [AdministradorController::class, 'eliminarDesarrollador'])->name('delete_Desarrollador');
Route::delete('destroy_Admin/{id}', [AdministradorController::class, 'eliminarProductOwner'])->name('delete_Product_Owner');
//Desarrollador
//  Dashboard
//  Tareas Listado
//  Tablero kanban (No se puede añadir tareas nuevas)
