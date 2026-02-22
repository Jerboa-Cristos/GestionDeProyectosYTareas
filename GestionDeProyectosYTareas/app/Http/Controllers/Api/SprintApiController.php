<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sprint;
use App\Models\Tarea;

class SprintApiController extends Controller
{
    public function index(Sprint $sprint) {
        return response()->json($sprint->tareas);
    }


    public function store(Request $request, Sprint $sprint) {
        $validar = $request->validate([
            'nombre' => 'required|string|max:40',
            'tipo' => 'required|in:Backend,Frontend,Diseño,Despliegue,Testing',
            'estado' => 'required|in:Por Hacer,En Curso,En Revision,Finalizado',
            'descripcion' => 'nullable|string',
            'fecha_fin' => 'nullable|date',
            //'id_desarrollador' => 'required|exists:desarrollador,id'
            'id_desarrollador' => '1'
        ]);

        $tarea = $sprint->tareas()->create($validar);

        return response()->json($tarea);
    }


    public function show(Sprint $sprint, $id) {
        $tarea = $sprint->tareas()->findOrFail($id);
        return response()->json($tarea);
    }

    public function update(Request $request, Sprint $sprint, $id) {
        $tarea = $sprint->tareas()->findOrFail($id);

        $validar = $request->validate([
            'nombre' => 'required|string|max:40',
            'tipo' => 'required|in:Backend,Frontend,Diseño,Despliegue,Testing',
            'estado' => 'required|in:Por Hacer,En Curso,En Revision,Finalizado',
            'descripcion' => 'nullable|string',
            'fecha_fin' => 'nullable|date',
            'id_desarrollador' => 'required|exists:desarrollador,id'
        ]);

        $tarea->update($validar);
        return response()->json($tarea);
    }


    public function destroy(Sprint $sprint, $id) {
        $tarea = $sprint->tareas()->findOrFail($id);
        $tarea->delete();
        
        return response()->json(['mensaje' => 'Tarea eliminada']);
    }
}
