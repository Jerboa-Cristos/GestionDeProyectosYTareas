<?php

namespace App\Http\Controllers;

use App\Models\Desarrollador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class DesarrolladorController extends Controller
{
    public function indexUsuarios(){ //Mostrar datos sobre usuarios
        $desarrolladores=Desarrollador::all();
        $desarrolladores->sortBy('nombre')->values()->all();
        return response()->json($desarrolladores, 200);
    }

    public function asignarProyecto(Request $request, $id) {
        $desarrollador_info = $request->validate([
            'id_proyecto'=>'required|exists:proyecto,id',
        ]);
        Desarrollador::findOrFail($id)->update([
            'id_proyecto'=>$desarrollador_info('id_proyecto'),
        ]);
    }

}
