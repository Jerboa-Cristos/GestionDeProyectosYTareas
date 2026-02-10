<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\ProductOwnerController;
use App\Http\Controllers\DesarrolladorController;
use App\Http\Controllers\ProyectoController;


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';


//  Product Owner Rutas para crear el proyecto
Route::get('index', [ProductOwnerController::class, 'index'])->name('index');
Route::get('create', [ProductOwnerController::class, 'create'])->name('cargarFormulario');
Route::post('store', [ProductOwnerController::class, 'store'])->name('guardar');
Route::get('show/{id}', [ProductOwnerController::class, 'show'])->name('mostrar');
Route::get('edit/{id}', [ProductOwnerController::class, 'edit'])->name('editar');
Route::put('update/{id}', [ProductOwnerController::class, 'update'])->name('actualizar');
Route::delete('destroy/{id}', [ProductOwnerController::class, 'destroy'])->name('eliminar');

//SPRINT
Route::get('index_sprint', [ProyectoController::class, 'index'])->name('index');
Route::get('create_sprint', [ProyectoController::class, 'create'])->name('cargarFormulario');
Route::post('store_sprint/{id_proyecto}', [ProyectoController::class, 'store'])->name('guardar');
Route::get('show_sprint/{id}', [ProyectoController::class, 'show'])->name('mostrar');
Route::get('edit_sprint/{id}', [ProyectoController::class, 'edit'])->name('editar_formulario');
Route::put('update_sprint/{id}', [ProyectoController::class, 'update'])->name('actualizar');
Route::delete('destroy_sprint/{id}', [ProyectoController::class], 'destroy')->name('eliminar');

//TAREA

//Administrador. Pensar como se podría hacer de una mejor manera
Route::get('index_Admin', [AdministradorController::class, 'indexDesarrollador'])->name('Index_Desarrollador');
Route::get('index_Admin', [AdministradorController::class, 'indexProductOwner'])->name('Index_Product_Owner');

Route::get('create_Admin',[AdministradorController::class, 'create'])->name('crear_users');//ESTO DEBE SER UN FORMULARIO

Route::post('store_Admin',[AdministradorController::class, 'guardarDesarrollador'])->name('Store_Desarrollador');
Route::post('store_Admin',[AdministradorController::class, 'guardarProductOwner'])->name('Store_Product_Owner');

Route::get('edit_Admin/{id}', [AdministradorController::class, 'editDesarrollador'])->name('Edit_Desarrollador');//ESTO DEBE SER UN FORMULARIO
Route::get('edit_Admin/{id}', [AdministradorController::class, 'editProductOwner'])->name('Edit_Product_Owner');
Route::get('edit_Admin/{id}',[AdministradorController::class, 'edit'])->name('Edit_Admin');

Route::get('show_Admin/{id}', [AdministradorController::class, 'showDesarrollador'])->name('show_Desarrollador');
Route::get('show_Admin/{id}', [AdministradorController::class, 'showProductOwner'])->name('show_Product_Owner');
Route::get('show_Admin/{id}', [AdministradorController::class, 'show'])->name('show_Admin');

Route::put('update_Admin/{id}', [AdministradorController::class, 'updateDesarrollador'])->name('update_Desarrollador');
Route::put('update_Admin/{id}', [AdministradorController::class, 'updateProductOwner'])->name('update_Product_Owner');
Route::put('update_Admin/{id}', [AdministradorController::class, 'update'])->name('update_Admin');

Route::delete('destroy_Admin/{id}', [AdministradorController::class, 'eliminarDesarrollador'])->name('delete_Desarrollador');
Route::delete('destroy_Admin/{id}', [AdministradorController::class, 'eliminarProductOwner'])->name('delete_Product_Owner');

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
