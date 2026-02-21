<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Proyecto;
use App\Models\Sprint;

//crea sprints
class ProyectoApiController extends Controller
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

        return $proyecto->sprints()->create($validar);
    }

    public function show(Proyecto $proyecto, $id) {
        $sprint = $proyecto->sprints()->findOrFail($id);

        return response()->json($sprint);

    }

    public function update(Request $request, Proyecto $proyecto, $id) {
        $sprint = $proyecto->sprints()->findOrFail($id);
        $validar = $request->validate([
            'nombre' => 'required|string|max:40',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date',
            'meta_sprint' => 'nullable|string',

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
