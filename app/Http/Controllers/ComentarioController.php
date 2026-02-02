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
        Comentario::create($request);
    }

    public function show($id) {
        $comentario =Comentario::find($id);
        return view('/tarea/informacion', 'comentario', $comentario);
    }

    public function edit($id) {//FORMULARIO para editar comentarios
        $comentario =Comentario::find($id);
        return view('/tarea/informacion', 'comentario', $comentario);
    }

    public function update(Request $request, $id) { //Guarda la versión corregida
        Comentario::find($id)->firstOrFail()->update([
            'texto'=>$request->get('texto'),
        ]);
    }

    public function eliminar($id) {
        Comentario::find($id)->firstOrFail()->delete();
    }
}
