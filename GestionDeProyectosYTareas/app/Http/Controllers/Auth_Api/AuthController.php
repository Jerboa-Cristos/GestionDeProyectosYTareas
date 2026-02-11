<?php

namespace App\Http\Controllers\Auth_Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            //email debe ser único en la tabla users
            'email' => 'required|email|unique:users',
            'password' => 'required|same:confirmed_password'
        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            //Hash::make() para encriptar la contraseña antes de guardarla en la base de datos
            'password' => Hash::make($request->password)
        ]);

        $input['name'] = $user->name;
        $input['email'] = $user->email;
        //plainTextToken es para tener formato en el token
        $input['token'] = $user->createToken("App")->plainTextToken;

        return response()->json($input);
    }

    public function login(Request $request) {
        //Auth::attempt() verifica las credenciales y si son correctas, el user inicia sesión
        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json(['errors' => ["Invalid credentials"]]);
        }

        $user = Auth::user();
        $input['name'] = $user->name;
        $input['email'] = $user->email;
        $input['token'] = $user->createToken('App')->plainTextToken;

        return response()->json($input);

        
    }

    public function profile(Request $request){  
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        } 

        
        $user = Auth::user();

        $user->name = $request->name;
        $user->email = $request->email;

        if($request->password){
            $user->password = Hash::make($request->password);
        }

        $user->save();
        
        $input['name'] = $user->name;
        $input['email'] = $user->email;

        return response()->json($input);
    }
}
