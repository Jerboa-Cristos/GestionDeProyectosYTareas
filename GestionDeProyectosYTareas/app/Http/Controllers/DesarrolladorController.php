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
}
