<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Proyecto;
use App\Models\Sprint;

//crea sprints
class ProyectoController extends Controller
{
    public function index(Proyecto $proyecto) {
        return  response()->json($proyecto->sprints);
    }

    public function store(Request $request, Proyecto $proyecto) {
        $validar = $request->validate([
            'nombre' => 'required|string|max:40',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date',
            'meta_sprint' => 'nullable|string',  
        ]);

        $proyecto->sprints()->create($validar);
        
        return response()->json(['message'=>'Sprint creado'], 200);
    }

    public function show(Proyecto $proyecto, $id) {
        $sprint = $proyecto->sprints()->findOrFail($id);

        return response()->json($sprint);
    }

    public function update(Request $request, Proyecto $proyecto, $id) {
        $sprint = $proyecto->sprints()->findOrFail($id);
        $validar = $request->validate([
            'nombre' => 'required|string|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date',
            'meta_sprint' => 'nullable|string|max:300',

        ]);

        $sprint->update($validar);
        return response()->json($sprint);
    }

    public function destroy(Proyecto $proyecto, $id ) {
        $sprint = $proyecto->sprints()->findOrFail($id);
        $sprint->delete();
        return response()->json(['mensaje' => 'Sprint eliminado']);
    }
}
