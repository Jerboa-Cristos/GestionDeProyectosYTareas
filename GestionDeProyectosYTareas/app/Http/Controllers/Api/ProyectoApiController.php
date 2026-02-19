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
        return  $proyecto->sprints;
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

    public function show($id_proyecto) {
        return Sprint::where('id_proyecto', $id_proyecto)->get();

    }

    public function update(Request $request, Sprint $sprint) {
        $validar = $request->validate([
            'nombre' => 'required|string|max:40',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date',
            'meta' => 'nullable|date'

        ]);

        $sprint->update($validar);
        return $sprint;
    }

    public function destroy(Sprint $sprint ) {
        $sprint->delete();

        return response()->json(['mensaje' => 'Sprint eliminado']);
    }
}
