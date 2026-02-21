<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Proyecto;
use App\Models\ProductOwner;

class ProductOwnerApiController extends Controller
{

    public function index() {
        $product_owner = auth('product_owner')->user();
        return response()->json($product_owner->proyectos);
    }

    public function store(Request $request) {
        $validar = $request->validate([
            'nombre' => 'required|string|max:40',
            'descripcion' => 'required|string|max:300',
            'fecha_fin' => 'nullable|date',
             
        ]);

        $product_owner = auth('product_owner')->user();

        $proyecto = $product_owner->proyectos()->create($validar);

        return response()->json($proyecto);
    }

    public function show($id) {
        $product_owner = auth('product_owner')->user();
        $proyecto = $product_owner->proyectos()->findOrFail($id);

        return response()->json($proyecto);
    }

    public function update(Request $request, $id) {
        $product_owner = auth('product_owner')->user();

        $proyecto = $product_owner->proyectos()->findOrFail($id);

        $proyecto->update($request->validate([
            'nombre' => 'required|string|max:40',
            'descripcion' => 'required|string|max:300',
            'fecha_fin' => 'nullable|date'
        ]));

        return response()->json($proyecto);
    }

    public function destroy($id) {
        $product_owner = auth('product_owner')->user();
        $proyecto = $product_owner->proyectos()->findOrFail($id);

        $proyecto->delete();

        return response()->json(['mensaje' => 'Proyecto eliminado']);
    }

}
