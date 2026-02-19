<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\ProductOwnerController;
use App\Http\Controllers\DesarrolladorController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\TareaController;


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


//RUTAS PARA TAREAS DE PARTE DEL DESAROLLADOR
Route::get('indexTareaParaUsuario',[TareaController::class, 'indexTareaParaUsuario']);
Route::get('indexTareaParaSprint',[TareaController::class, 'indexTareaParaSprint']);
Route::get('showTarea/{id}',[TareaController::class, 'showTarea']);
Route::put('updateTarea/{id}',[DesarrolladorController::class, 'updateTarea']);

//ADMINISTRADOR
Route::get('indexUsuarios', [AdministradorController::class, 'indexUsuarios']);
Route::get('showUsuarios/{rol}/{id}', [AdministradorController::class, 'show']);
Route::delete('eliminarUsuarios/{rol}/{id}', [AdministradorController::class, 'eliminarUsuario']);
Route::post('storeUsuarios',[AdministradorController::class, 'store']);
Route::put('updateUsuarios/{rol}/{id}', [AdministradorController::class, 'update']);

//DESAROLLADOR
Route::get('indexUsuarios', [DesarrolladorController::class, 'indexUsuarios']);
Route::put('asignarProyecto/{id}',[DesarrolladorController::class, 'asignarProyecto']);



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
