<?php

namespace App\Http\Controllers;

use App\Models\Comentario;

use Illuminate\Http\Request;

class ComentarioController extends Controller
{

    public function index() { //Obtiene toda la información de la tabla
        $comentarios=Comentario::all();
        $comentarios->sortBy('fecha')->values()->all();
        return response()->json($comentarios, 200);
    }

    public function create() {//FORMULARIO para crear la entidad
        return view('tarea.infromacion');
    }

    public function guardar(Request $request) {//Guarda la infromación del formulario ya validado en el 
        $comentarioNuevo = $request->validate([
            'texto'=>'required|max:300',
            'fecha'=>'required|date',
            'id_desarrollador'=>'required|exists:desarrollador,id',
            'id_productOwner'=>'required|exists:product_owner,id',
            'id_tarea'=>'required|exists:tarea,id',
        ]);
        Comentario::create([
            'texto'=>$comentarioNuevo('texto'),
            'fecha'=>$comentarioNuevo('fecha'),
            'id_desarrollador'=>$comentarioNuevo('id_desarrollador'),
            'id_productOwner'=>$comentarioNuevo('id_productOwner'),
            'id_tarea'=>$comentarioNuevo('id_tarea'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);
    }

    public function show($id) {
        $comentario =Comentario::findOrFail($id);
        return view('tarea.informacion', ['comentario'=>$comentario]);
    }

    public function edit($id) {//FORMULARIO para editar comentarios
        $comentario =Comentario::findOrFail($id);
        return view('tarea.informacion', ['comentario'=>$comentario]);
    }

    public function update(Request $request, $id) { //Guarda la versión corregida
        $comentarioNuevo = $request->validate([
            'texto'=>'required|max:300',
        ]);
        Comentario::findOrFail($id)->firstOrFail()->update([
            'texto'=>$comentarioNuevo('texto'),
        ]);
    }

    public function eliminar($id) {
        Comentario::findOrFail($id)->firstOrFail()->delete();
        return redirect()->back()->with('success','Eliminado con exito');
    }
}
