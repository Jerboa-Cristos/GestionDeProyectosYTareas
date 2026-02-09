<?php

namespace App\Http\Controllers;

use App\Models\Desarrollador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 


class DesarrolladorController extends Controller
{
    public function show($id) {
        //$user = Auth::user();//Obtenemos el usuario que esta logeado actualmente 

        $desarrollador = Desarrollador::findOrFail($id);
        return view('desarrollador.show_Desarrollador', ['desarrollador'=>$desarrollador]);
    }

    public function edit($id) {
        $desarrollador=Desarrollador::findOrFail($id);
        return view('desarrollador.edit_Desarrollador', ['desarrollador'=>$desarrollador]);
    }

    public function update(Request $request, $id) {
        $desarrollador_info = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique|email',
            'password'=>'required|confirmed',
            'id_administrador'=>'required|exists:administrador,id',
            'id_proyecto'=>'required|exists:proyecto,id',
            'fecha_alta'=>'required|date',
        ]);
        Desarrollador::find($id)->firstOrFail()->update([
            'nombre'=>$desarrollador_info('nombre'),
            'email'=>$desarrollador_info('email'),
            'password'=>$desarrollador_info('password'),
            'id_administrador'=>$desarrollador_info('id_administrador'),
            'id_proyecto'=>$desarrollador_info('id_proyecto'),
            'fecha_alta'=>$desarrollador_info('fecha_alta'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);
    }

}
