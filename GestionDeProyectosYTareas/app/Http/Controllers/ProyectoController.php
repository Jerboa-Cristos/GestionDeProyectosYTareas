<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sprint;

class ProyectoController extends Controller
{
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

        Sprint::create([
            'nombre' => $validar_datos['nombre'],
            'fecha_inicio' => $validar_datos['fecha_inicio'],
            'fecha_fin' => $validar_datos['fecha_fin'],
            'id_proyecto' => $id_proyecto
        ]);

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




}
