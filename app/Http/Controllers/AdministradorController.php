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
    public function crearUsuarios(Request $request) {
        $usuarios = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
        ]);
        $rol = $request->get('rol');
        if($rol == 'Desarrollador') {
            Desarrollador::create($usuarios);
        } else {
            ProductOwner::create($usuarios);
        }
    }

    //Editar usuarios
    public function editarUsuarios(Request $request) {
        $email = $request->get('email');
        $rol = $request->get('rol');
        if($rol == 'Desarrollador') {
            Desarrollador::where('email', $email)->firstOrFail()->update([
                'nombre'=>$request->get('nombre'),
                'email'=>$request->get('email'),
                'password'=>$request->get('password')
            ]);
        } else {
            ProductOwner::where('email', $email)->firstOrFail()->update([
                'nombre'=>$request->get('nombre'),
                'email'=>$request->get('email'),
                'password'=>$request->get('password')
            ]);
        }
    }

    //Borrar usuarios
    public function eliminarUsuarios(Request $request) {
        $email = $request->get('email');
        $rol = $request->get('rol');
        if($rol == 'Desarrollador') {
            Desarrollador::where('email', $email)->firstOrFail()->delete();
        } else {
            ProductOwner::where('email', $email)->firstOrFail()->delete();
        }
    }
}
