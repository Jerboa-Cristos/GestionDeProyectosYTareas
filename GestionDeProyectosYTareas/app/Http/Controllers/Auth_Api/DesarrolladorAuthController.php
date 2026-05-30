<?php

namespace App\Http\Controllers\Auth_Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Desarrollador;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class DesarrolladorAuthController extends Controller
{
    public function loginDesarrollador(Request $request){
        try{
            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            $desarrollador = Desarrollador::where('email', $request->email)->first();

            if(!$desarrollador){
                return response()->json(['error' => 'Email incorrecto'], 401);
            }

            if(!Hash::check($request->password, $desarrollador->password)){
                return response()->json(['error' => 'Contraseña incorrecta'], 401);
            }

            $input['id'] = $desarrollador->id;
            $input['nombre'] = $desarrollador->nombre;
            $input['rol'] = 'desarrollador';
            $input['email'] = $desarrollador->email;
            $input['token'] = $desarrollador->createToken('Desarrollador')->plainTextToken;
            
            return response()->json($input, 200);

        } catch(\Exception $e) {
            return response()->json(['message'=>'Error al iniciar sesión'], 500);
        }   
    }
    

    public function profileDesarrollador(Request $request){
        try{
            $validar_desarrollador = Validator::make($request->all(), [
            'nombre' => 'required',
            //en unique se pone la tabla
            'email' => 'required|email|unique:desarrollador,email,' . $request->user()->id,
            'password' => 'nullable|same:confirmed_password'
            ]);

            if($validar_desarrollador->fails()){
                return response()->json(['errors' => $validar_desarrollador->errors()->all()], 422);
            }


            $desarrollador = $request->user();

            $desarrollador->nombre = $request->nombre;
            $desarrollador->email = $request->email;

            if($request->filled('password')){
                $desarrollador->password = Hash::make($request->password);
            }

            $desarrollador->save();
            $input['nombre'] = $desarrollador->nombre;
            $input['email'] = $desarrollador->email;

            return response()->json($input);

        }catch(\Exception $e) {
            return response()->json(['message'=>'No tiene acceso'], 500);
        }
    }
}
