<?php

namespace App\Http\Controllers;
use App\Models\Desarrollador;

use Illuminate\Http\Request;

class AdministradorController extends Controller
{
    //Aquí se ponen las funciones. Las funciones pueden devolver vistas a páginas
    //El Administrador puede:

    //Crear usuarios
    public function crearUsuarios(Request $request) {
        $usuarios = $request->validate([
            'nombre'=>'required|max:40',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
        ]);        
    }

    //Editar usuarios
    public function editarUsuarios(Request $request) {
        
    }

    //Borrar usuarios
    public function eliminarUsuarios() {

    }
}
