<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Proyecto;

class ProductOwnerApiController extends Controller
{

    public function index() {
        return Proyecto::all();
    }

    public function store($id) {
        $validar = $request->validate([
            'nombre' => 'required|string|max:40',
            'descripcion' => 'required|string|max:300',
            'fecha_fin' => 'nullable|date',
        ]);

        $product_owner = ProductOwner::findOrFail(1);

        $proyecto = $product_owner->proyectos()->create($validar);

        return response()->json($proyecto);
    }
        
    public function show($id) {
        return Proyecto::findOrFail($id);

    }

    public function update(Request $request) {
        $proyecto = Proyecto::findOrFail($id);
        $proyecto->update($request->all());
        return response()->json($proyecto);
    }

    public function destroy($id) {
        Proyecto::destroy($id);

        return response()->json(['mensaje' => 'Proyecto eliminado']);
    }

}
