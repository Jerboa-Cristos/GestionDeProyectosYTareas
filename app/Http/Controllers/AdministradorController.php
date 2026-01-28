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
            'nombre'=>'',
            'email'=>'',
            'password'=>''

        ]);
        
        if($request = 'Desarrollador') {
            Desarrollador::create($usuarios);
        } else {
            //ProductOwner::create($usuarios);
        }

        
    }

    //Editar usuarios
    public function editarUsuarios() {

    }

    //Borrar usuarios
    public function eliminarUsuarios() {

    }
}
