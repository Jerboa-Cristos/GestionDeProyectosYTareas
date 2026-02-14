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
    public function registerDesarrollador(Request $request ){
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:40',
            'email' => 'required|email|unique:desarrollador',
            'password' => 'required|same:confirmed_password',

        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        $desarrollador = Desarrollador::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'fecha_alta' => now(),
            'id_administrador' => 1,
            'id_proyecto' => 1
        ]);

        $input['nombre'] = $desarrollador->nombre;
        $input['email'] = $desarrollador->email;
        $input['token'] = $desarrollador->createToken('Desarrollador')->plainTextToken;

        return response()->json($input);
    }

    public function loginDesarrollador(Request $request){
        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json(['errors' => ['Invalid credentials']]);
        }

        $desarrollador = Auth::user();
        $input['nombre'] = $desarrollador->nombre;
        $input['email'] = $desarrollador->email;
        $input['token'] = $desarrollador->createToken('Desarrollador')->plainTextToken;

        return response()->json($input);
    }

    public function profileDesarrollador(Request $request){
        $validar_desarrollador = Validator::make($request->all(), [
            'nombre' => 'required',
            'email' => 'required|email'
        ]);

        if($validar_desarrollador->fails()){
            return response()->json(['errors' => $validar_desarrollador->errors()->all()]);
        }

        //Auth::user() llama al guard desarrollador definido en config/auth.php para obtener el usuario autenticado
        $desarrollador = Auth::user();

        $desarrollador->nombre = $request->nombre;
        $desarrollador->email = $request->email;

        if($request->password){
            $desarrollador->password = Hash::make($request->password);
        }

        $desarrollador->save();
        $input['nombre'] = $desarrollador->nombre;
        $input['email'] = $desarrollador->email;

        return response()->json($input);
    }
}
