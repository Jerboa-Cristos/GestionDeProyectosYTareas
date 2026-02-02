<?php

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


//Administrador:
//  Listado de usuarios
//  Perfil de usuarios
//  Creación de usuarios
//  Edición de usuarios


//Product Owner
//  Proyectos
//  Creación de proyectos
//  Sprints
//  Creación de Sprints
//  Tablero Kanban (Se puede añadir tareas)
//  Tareas Listado
//  Edición de tareas
//  Creación de tareas

//Desarrollador
//  Dashboard
//  Tareas Listado
//  Tablero kanban (No se puede añadir tareas nuevas)
