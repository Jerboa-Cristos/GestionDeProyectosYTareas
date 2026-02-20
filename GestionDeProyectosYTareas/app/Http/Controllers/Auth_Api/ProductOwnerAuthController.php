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
            'id_administrador' => 1
        ]);

        $input['nombre'] = $product_owner->nombre;
        $input['email'] = $product_owner->email;
        $input['token'] = $product_owner->createToken('Product_Owner')->plainTextToken;

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
        //el * sirve para darle permisos al token para hacer todo
        $input['token'] = $product_owner->createToken('Product_Owner', ['*'] ,'product_owner')->plainTextToken;

        return response()->json($input);
    }

    public function profileProductOwner(Request $request){
        $usuario = auth('product_owner')->user();

        return response()->json([
            'nombre' => $usuario->nombre,
            'email' => $usuario->email
        ]);
    }


    public function actualizar_profileProductOwner(Request $request){
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
