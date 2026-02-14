<?php

namespace App\Http\Controllers\Auth_Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdministradorAuthController extends Controller
{
    public function registerAdministrador(Request $request ){
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:40',
            'email' => 'required|email|unique:administrador',
            'password' => 'required|same:confirmed_password',

        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        $administrador = Administrador::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'fecha_alta' => now(),
        ]);

        $input['nombre'] = $administrador->nombre;
        $input['email'] = $administrador->email;
        $input['token'] = $administrador->createToken('Administrador')->plainTextToken;

        return response()->json($input);
    }

    public function loginAdministrador(Request $request){
        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json(['errors' => ['Invalid credentials']]);
        }

        $administrador = Auth::user();
        $input['nombre'] = $administrador->nombre;
        $input['email'] = $administrador->email;
        $input['token'] = $administrador->createToken('Administrador')->plainTextToken;

        return response()->json($input);
    }

    public function profileAdministrador(Request $request){
        $validar_administrador = Validator::make($request->all(), [
            'nombre' => 'required',
            'email' => 'required|email'
        ]);

        if($validar_administrador->fails()){
            return response()->json(['errors' => $validar_administrador->errors()->all()]);
        }

        //Auth::user() llama al guard administrador definido en config/auth.php para obtener el usuario autenticado
        $administrador = Auth::user();

        $administrador->nombre = $request->nombre;
        $administrador->email = $request->email;

        if($request->password){
            $administrador->password = Hash::make($request->password);
        }

        $administrador->save();
        $input['nombre'] = $administrador->nombre;
        $input['email'] = $administrador->email;

        return response()->json($input);
    }
}
