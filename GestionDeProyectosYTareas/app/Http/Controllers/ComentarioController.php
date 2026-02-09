<?php

namespace App\Http\Controllers;

use App\Models\Comentario;

use Illuminate\Http\Request;

class ComentarioController extends Controller
{

    public function index() { //Obtiene toda la información de la tabla
        $comentarios=Comentario::all();
        return view('/dashboard', 'comentarios', $comentarios);
    }

    public function create() {//FORMULARIO para crear la entidad
        return view('/tarea/infromacion');
    }

    public function guardar(Request $request) {//Guarda la infromación del formulario ya validado en el 
        $request->validate([
            'texto'=>'required|max:300',
        ]);
        Comentario::create($request);
    }

    public function show(Request $request) {
        $comentario =Comentario::findOrFail($request->get('id'));
        return view('/tarea/informacion', 'comentario', $comentario);
    }

    public function edit(Request $request) {//FORMULARIO para editar comentarios
        $comentario =Comentario::findOrFail($request->get('id'));
        return view('/tarea/informacion', 'comentario', $comentario);
    }

    public function update(Request $request) { //Guarda la versión corregida
        Comentario::findOrFail($request->get('id'))->firstOrFail()->update([
            'texto'=>$request->get('texto'),
        ]);
    }

    public function eliminar(Request $request) {
        Comentario::findOrFail($request->get('id'))->firstOrFail()->delete();
    }
}
