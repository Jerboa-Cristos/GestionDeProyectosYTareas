<?php

namespace App\Http\Controllers;

use App\Models\Comentario;

use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    //Se debe añadir a la base de datos
    public function guardar(Request $request) {
        Comentario::create($request);
    }

    public function editar(Request $request) {
        Comentario::where('texto', $request->get('texto'))->firstOrFail()->update([
            'texto'=>$request->get('texto'),
        ]);
    }

    public function eliminar(Request $request) {
        Comentario::where('texto', $request->get('texto'))->firstOrFail()->delete();
    }
}
