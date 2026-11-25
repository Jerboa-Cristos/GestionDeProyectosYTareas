<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sprint;
use App\Models\Tarea;

class SprintController extends Controller
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
            'id_desarrollador' => 'required|exists:desarrollador,id'
            
        ]);

        $tarea = $sprint->tareas()->create($validar);

        return response()->json($tarea, 200);
    }


    public function show(Sprint $sprint, $id) {
        $tarea = $sprint->tareas()->with('desarrollador')->findOrFail($id);

        return response()->json($tarea, 200);
    }

    public function update(Request $request, Sprint $sprint, $id) {
        $tarea = $sprint->tareas()->findOrFail($id);

        $validar = $request->validate([
            'nombre' => 'required|string|max:100',
            'tipo' => 'required|in:Backend,Frontend,Diseño,Despliegue,Testing',
            'estado' => 'required|in:Por Hacer,En Curso,En Revision,Finalizado',
            'descripcion' => 'nullable|string|max:300',
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
