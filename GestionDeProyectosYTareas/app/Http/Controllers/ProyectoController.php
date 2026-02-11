<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sprint;
use App\Models\Proyecto;

class ProyectoController extends Controller
{
    //CRUD DE SPRINT
    public function index(){
        $listado_sprint = Sprint::all();
        return view('sprint.index_sprint', compact('listado_sprint'));
    }

    public function create(){
        return view('sprint.create');
    }

    public function store(Request $request, $id_proyecto){
        $validar_datos = $request->validate([
            'nombre' => 'required|string|max:40',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date'
        ]);

        $proyecto = Proyecto::findOrFail($id_proyecto);

        $sprint = new Sprint([
            'nombre' => $validar_datos['nombre'],
            'fecha_inicio' => $validar_datos['fecha_inicio'],
            'fecha_fin' => $validar_datos['fecha_fin'],
            'id_proyecto' => $id_proyecto
        ]);

        $proyecto->sprints()->save($sprint);

        return redirect()->route('index');
    }

    public function show($id){
        $sprint = Sprint::findOrFail($id);
        return view('sprint.show_sprint', compact('sprint'));
    }

    public function edit($id){
        $editar_sprint = Sprint::findOrFail($id);
        return view('sprint.edit', compact('editar_sprint'));
    }

    public function update(Request $request, $id){
        $validar_datos = $request->validate([
            'nombre' => 'required|string|max:40',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date'
        ]);

        Sprint::findOrFail($id)->update($validar_datos);
        return redirect()->route('index');
    }



    public function destroy($id){
        $datos_sprint = Sprint::finOrFail($id);
        $datos_sprint->delete();

        return redirect()->route('index');
    }


    //CRUD SOLO PARA MOSTRAR UN PROYECTO - EDITARLO - ELIMINARLO (SHOW - EDIT - UPDATE - DESTROY)
    public function show_proyecto($id){
        $proyecto = Proyecto::findOrFail($id);
        return view('product_owner_proyecto.show', compact('proyecto'));
    }

    public function edit_proyecto($id){
        $editar_proyecto = Proyecto::findOrFail($id);
        return view('product_owner_proyecto.edit', compact('editar_proyecto'));
    }

    public function update_proyecto(Request $request, $id){
        $validar_datos = $request->validate([
            'nombre' => 'required|string|max:40',
            'descripcion' => 'nullable|string|max:255'
        ]);

        Proyecto::findOrFail($id)->update($validar_datos);
        return redirect()->route('index_proyectos');
    }

    public function destroy_proyecto($id){
        $datos_proyecto = Proyecto::findOrFail($id);
        $datos_proyecto->delete();

        return redirect()->route('index_proyectos');
    }

}
