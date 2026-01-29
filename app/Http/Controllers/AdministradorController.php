<?php

namespace App\Http\Controllers;
use App\Models\Desarrollador;
use App\Models\ProductOwner;
use Illuminate\Http\Request;

class AdministradorController extends Controller
{
    //Aquí se ponen las funciones. Las funciones pueden devolver vistas a páginas
    //El Administrador puede:

    //Crear usuarios
    public function crearUsuarios(Request $request, string $choice) {
        $usuarios = $request->validate([
            'nombre'=>'required|max:40',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
        ]);        
        if($choice == 'Desarrollador') {
            Desarrollador::create($usuarios);
        } else {
            ProductOwner::create($usuarios);
        }
    }

    //Editar usuarios
    public function editarUsuarios(Request $request) {
        
    }

    //Borrar usuarios
    public function eliminarUsuarios() {

    }
}
