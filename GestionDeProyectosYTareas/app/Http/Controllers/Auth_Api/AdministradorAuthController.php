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
        try{
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

            
            return response()->json($input, 200);
        }  catch(\Exception $e) {
            return response()->json(['message'=>'Error al registrar el administrador'], 500);
        } 
    }

    public function loginAdministrador(Request $request){
        try{

            $request->validate([
            'email' => 'required|email',
            'password' => 'required'
            ]);

            $administrador = Administrador::where('email', $request->email)->first();

            if(!$administrador){
                return response()->json(['error' => 'Email incorrecto'], 401);
            }

            if(!Hash::check($request->password, $administrador->password)){
                return response()->json(['error' => 'Contraseña incorrecta'], 401);
            }

            $input['id'] = $administrador->id;
            $input['nombre'] = $administrador->nombre;
            $input['rol'] = 'administrador';
            $input['email'] = $administrador->email;
            $input['token'] = $administrador->createToken('Administrador')->plainTextToken;
            
            return response()->json($input, 200);  

        } catch(\Exception $e) {
            return response()->json(['message'=>'Error al iniciar sesión'], 500);
        }
    }


    public function profileAdministrador(Request $request){
        try{
            $validar_administrador = Validator::make($request->all(), [
            'nombre' => 'required',
            'email' => 'required|email|unique:administrador,email,' . $request->user()->id,
            'password' => 'nullable|same:confirmed_password'
            ]);

            if($validar_administrador->fails()){
                return response()->json(['errors' => $validar_administrador->errors()->all()], 422);
            }

            //Auth::user() llama al guard administrador definido en config/auth.php para obtener el usuario autenticado
            $administrador = $request->user();

            $administrador->nombre = $request->nombre;
            $administrador->email = $request->email;

            if($request->filled('password')){
                $administrador->password = Hash::make($request->password);
            }

            $administrador->save();
            $input['nombre'] = $administrador->nombre;
            $input['email'] = $administrador->email;

            return response()->json($input);

        } catch(\Exception $e) {
            return response()->json(['message'=>'Error al guardar el perfil'], 500);
        }
    }
}
