<?php

namespace App\Http\Controllers\Auth_Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductOwner;


class ProductOwnerAuthController extends Controller
{
    
    public function loginProductOwner(Request $request){
        try{ 
            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);


            $product_owner = ProductOwner::where('email', $request->email)->first();

            if(!$product_owner || !Hash::check($request->password, $product_owner->password)){
                return response()->json(['error' => 'Email y password incorrectas']);
            }

            $input['nombre'] = $product_owner->nombre;
            $input['id'] = $product_owner->id;
            $input['rol'] = 'product_owner';
            $input['token'] = $product_owner->createToken('ProductOwner')->plainTextToken;
            
            return response()->json($input); 
        } catch(\Exception $e) {
            return response()->json(['message'=>'No tiene acceso'], 404);
        }   
    }


    public function obtenerDatosProfileProductOwner(Request $request) {
        $datosUsuario = $request->user();

        return response()->json([
            'nombre' => $datosUsuario->nombre,
            'email' => $datosUsuario->email
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
