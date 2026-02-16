<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarea;
use App\Models\Sprint;

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
            'fecha_fin' => 'nullable|date'
        ]);

        //cambiar la relacion
        $sprint = Sprint::findOrFail(1);

        $tarea = new Tarea([
            'tipo' => $validar_datos['tipo'],
            'descripcion' => $validar_datos['descripcion'],
            'fecha_fin' => $validar_datos['fecha_fin'],
            ''
        ]);

        $sprint->tareas()->save($tarea);
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

    //CRUD PARA MOSTRAR - EDITAR - GUARDAR - ELIMINAR SPRINT
    public function show_sprint($id){
        $sprint = Sprint::findOrFail($id);
        return view('sprint.show_sprint', compact('sprint'));
    }

    public function edit_sprint($id){
        $editar_sprint = Sprint::findOrFail($id);
        return view('sprint.edit', compact('editar_sprint'));
    }

    public function update_sprint(Request $request, $id){
        $validar_datos = $request->validate([
            'nombre' => 'required|string|max:40',
            'fecha_fin' => 'nullable|date'
        ]);

        Sprint::findOrFail($id)->update($validar_datos);
        return redirect()->route('index');
    }

    public function destroy_sprint($id){
        $datos_sprint = Sprint::finOrFail($id);
        $datos_sprint->delete();

        return redirect()->route('index');

    }

}
