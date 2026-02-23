<?php

namespace App\Http\Controllers\Auth_Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductOwner;
use App\Models\Desarrollador;
use App\Models\Administrador;

class AdministradorAuthController extends Controller
{
    
    public function registerAdministrador(Request $request ){
        $request->validate([
            'nombre' => 'required|string|max:40',
            'email' => 'required|email|unique:administrador,email',
            'password' => 'required|same:confirmed_password',

        ]);

        $administrador = Administrador::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $input['nombre'] = $administrador->nombre;
        $input['id'] = $administrador->id;
        $input['rol'] = 'administrador';
        $input['token'] = $administrador->createToken('Administrador')->plainTextToken;

        
        return response()->json($input);
    }


     public function registerProductOwner(Request $request ){
        //en unique se pone el nombre de la tabla
        $request->validate([
            'nombre' => 'required|string|max:40',
            'email' => 'required|email|unique:product_owner,email',
            'password' => 'required|same:confirmed_password',

        ]);

        $product_owner = ProductOwner::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'id_administrador' => auth()->id,
        ]);

        
        return response()->json(['mensaje' => 'product_owner creado correctamente']);
    }

     public function registerDesarrollador(Request $request ){
        //en unique se pone el nombre de la tabla
        $request->validate([
            'nombre' => 'required|string|max:40',
            'email' => 'required|email|unique:product_owner,email',
            'password' => 'required|same:confirmed_password',

        ]);

        $desarrollador = Desarrollador::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'id_administrador' => auth()->id,
            'id_proyecto' => $request->id_proyecto
        ]);

        return response()->json(['mensaje' => 'desarrollador creado']);
    }





    public function loginAdministrador(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);


        $administrador = Administrador::where('email', $request->email)->first();

        if(!$administrador || !Hash::check($request->password, $administrador->password)){
            return response()->json(['error' => 'Email y password incorrectas']);
        }

        $input['nombre'] = $administrador->nombre;
        $input['id'] = $administrador->id;
        $input['rol'] = 'administrador';
        $input['token'] = $administrador->createToken('Administrador')->plainTextToken;
        
        return response()->json($input);      
            
    }


    public function profileAdministrador(Request $request){
        $validar_administrador = Validator::make($request->all(), [
            'nombre' => 'required',
            'email' => 'required|email|unique:administrador,email,' . $request->user()->id
        ]);

        if($validar_administrador->fails()){
            return response()->json(['errors' => $validar_administrador->errors()->all()]);
        }

        //Auth::user() llama al guard administrador definido en config/auth.php para obtener el usuario autenticado
        $administrador = $request->user();

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
