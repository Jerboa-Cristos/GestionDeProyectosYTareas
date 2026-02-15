<?php

namespace App\Http\Controllers\Auth_Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductOwner;


class ProductOwnerAuthController extends Controller
{
    // EJEMPLO DEL VIDEO, solo lo tengo de ejemplo luego esto se borrara porque no usamos tabla users 
    public function register_user(Request $request){
        //Validator::make() para validar los datos recibidos en la petición
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
        //App es el nombre del token, que se añade a la base de datos de su tabla tokens
        $input['token'] = $user->createToken("App")->plainTextToken;

        return response()->json($input);
    }


    public function registerProductOwner(Request $request ){
        //en unique se pone el nombre de la tabla 
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:40',
            'email' => 'required|email|unique:product_owner',
            'password' => 'required|same:confirmed_password',

        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        $product_owner = ProductOwner::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'fecha_alta' => now(),
            'id_administrador' => 1
        ]);

        $input['nombre'] = $product_owner->nombre;
        $input['email'] = $product_owner->email;
        $input['token'] = $product_owner->createToken('Product_Owner')->plainTextToken;

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


    public function loginProductOwner(Request $request){
        if(
            !ProductOwner::where('email', $request->email)->first() || 
            !Hash::check($request->password, ProductOwner::where('email', $request->email)->first()->password)){
            return response()->json(['errors' => ['Invalid credentials']]);
        }

        $product_owner = ProductOwner::where('email', $request->email)->first();
        $input['nombre'] = $product_owner->nombre;
        $input['email'] = $product_owner->email;
        $input['token'] = $product_owner->createToken('Product_Owner')->plainTextToken;

        return response()->json($input);
    }



    public function profile(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email'
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

    public function profileProductOwner(Request $request){
        $validar_product_owner = Validator::make($request->all(), [
            //email en la parte de unique debe escribir asi, sin espacios y coma al final
            'nombre' => 'required',
            
            'email' => 'required|email|unique:product_owner,email,' . $request->user()->id
        ]);

        if($validar_product_owner->fails()){
            return response()->json(['errors' => $validar_product_owner->errors()->all()]);
        }

        
        $product_owner = $request->user();

        $product_owner->nombre = $request->nombre;
        $product_owner->email = $request->email;

        if($request->password){
            $product_owner->password = Hash::make($request->password);
        }

        $product_owner->save();
        $input['nombre'] = $product_owner->nombre;
        $input['email'] = $product_owner->email;

        return response()->json($input);
    }
}
