<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\ProductOwnerController;
use App\Http\Controllers\DesarrolladorController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//  Product Owner
Route::get('index', [ProductOwnerController::class, 'index'])->name('index');
Route::get('create', [ProductOwnerController::class, 'create'])->name('cargarFormulario');
Route::post('store', [ProductOwnerController::class, 'store'])->name('guardar');
Route::get('edit/{id}', [ProductOwnerController::class, 'edit'])->name('editar');
Route::get('show/{id}', [ProductOwnerController::class, 'show'])->name('mostrar');
Route::put('update/{id}', [ProductOwnerController::class, 'update'])->name('actualizar');
Route::delete('destroy/{id}', [ProductOwnerController::class, 'destroy'])->name('eliminar');


//Administrador. Pensar como se podría hacer de una mejor manera
Route::get('index_Admin', [AdministradorController::class, 'indexUsuarios'])->name('IndexTodos');

Route::get('create_Admin',[AdministradorController::class, 'create'])->name('crear_users');//ESTO DEBE SER UN FORMULARIO

Route::get('show_Admin/{id}', [AdministradorController::class, 'showDesarrollador'])->name('showDesarrollador');

Route::patch('edit_Admin/{id}', [AdministradorController::class, 'editDesarrollador'])->name('editDesarrollador');//ESTO DEBE SER UN FORMULARIO

Route::delete('destroy_Admin/{id}', [AdministradorController::class, 'eliminarDesarrollador'])->name('eliminarDesarrollador');

Route::put('update_Admin/{id}', [AdministradorController::class, 'updateDesarrollador'])->name('updateDesarrollador');

Route::post('store_Admin',[AdministradorController::class, 'guardarDesarrollador'])->name('guardarDesarrollador');

/*
Route::post('store_Admin',[AdministradorController::class, 'guardarProductOwner'])->name('Store_Product_Owner');

Route::get('edit_Admin/{id}', [AdministradorController::class, 'editProductOwner'])->name('Edit_Product_Owner');
Route::get('edit_Admin/{id}',[AdministradorController::class, 'edit'])->name('Edit_Admin');


Route::get('show_Admin/{id}', [AdministradorController::class, 'showProductOwner'])->name('show_Product_Owner');
Route::get('show_Admin/{id}', [AdministradorController::class, 'show'])->name('show_Admin');


Route::put('update_Admin/{id}', [AdministradorController::class, 'updateProductOwner'])->name('update_Product_Owner');
Route::put('update_Admin/{id}', [AdministradorController::class, 'update'])->name('update_Admin');

Route::delete('destroy_Admin/{id}', [AdministradorController::class, 'eliminarProductOwner'])->name('delete_Product_Owner');
*/

//Desarrollador
Route::get('show_Des', [DesarrolladorController::class, 'show'])->name('show');
Route::get('edit_Des/{id}',[DesarrolladorController::class, 'edit'])->name('Edit');
Route::put('update_Des/{id}', [DesarrolladorController::class, 'update'])->name('update');


//AUTH
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
