<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarea;

class SprintController extends Controller
{
    public function index(){
        $listado_tareas = Tarea::all();
        return view('tarea.index_tarea', compact('listado_tareas'));
    }

    public function create(){
        return view('tarea.create_tarea');
    }

    public function store(Request $request){
        $validar_datos = $request->validate([
            'tipo' => 'required|in:Backend, Frontend, Diseño, Despliegue, Testing',
            'descripcion' => 'nullable|string|max:300',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date'
        ]);

        //cambiar la relacion

        Tarea::create([
            'tipo' => $validar_datos['tipo'],
            'descripcion' => $validar_datos['descripcion'],
            'fecha_inicio' => $validar_datos['fecha_inicio'],
            'fecha_fin' => $validar_datos['fecha_fin'],
            ''
        ]);
    }


    public function show($id){
        $tarea = Tarea::findOrFail($id);
        return view('tarea.show_tarea', compact('tarea'));
    }

    public function edit($id){
        $editar_tarea = Tarea::finOrFail($id);
        return view('tarea.edit_tarea', compact('editar_tarea'));
    }


    public function update(Request $request, $id){

    }

    public function destroy($id){
        $datos_tarea = Tarea::findOrFail($id);
        $datos_tarea->delete();

        return redirect()->route('index');
    }
}
