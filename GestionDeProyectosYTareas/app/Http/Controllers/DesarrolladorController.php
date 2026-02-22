<?php

namespace App\Http\Controllers;

use App\Models\Desarrollador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class DesarrolladorController extends Controller
{
    public function indexDesarrolladores(){ //Mostrar datos sobre usuarios A MODO DE LISTA ORDENADOS POR NOMBRE
        $desarrolladores=Desarrollador::all();
        $desarrolladores->sortBy('nombre')->values()->all();
        return response()->json($desarrolladores, 200);
    }

    public function asignarProyecto(Request $request, $id) { //PARA HACER UPDATE DEL USUARIO Y AÑADIRLE UN PROYECTO
    try{
        $desarrollador_info = $request->validate([
            'id_proyecto'=>'required|exists:proyecto,id',
        ]);
        Desarrollador::findOrFail($id)->update([ 
            'id_proyecto'=>$desarrollador_info('id_proyecto'),
        ]);

    } catch(\Exception $e) {
        return response()->json(['message'=>'NO se pudo hacer asignar el proyecto al usuario'], 404);
    }
        return response()->json(['message'=>'Proyecto Asignado'], 200); 

    }
}
