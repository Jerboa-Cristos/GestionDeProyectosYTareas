<?php

namespace App\Http\Controllers;

use App\Models\Desarrollador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 


class DesarrolladorController extends Controller
{
    public function show(Request $request) {
        //$user = Auth::user();//Obtenemos el usuario que esta logeado actualmente 

        $desarrollador = Desarrollador::findOrFail($request->get('id'));
        return view('administrador.show_Admin')->with('desarrollador', $desarrollador);
    }

    public function edit(Request $request) {
        $desarrollador=Desarrollador::findOrFail($request->get('id'));
        return view('/administrador.edit_Admin')->with('desarrollador', $desarrollador);
    }

    public function update(Request $request) {
        Desarrollador::find($request->get('id'))->firstOrFail()->update([
            'nombre'=>$request->get('nombre'),
            'email'=>$request->get('email'),
            'password'=>$request->get('password')
        ]);
    }

}
