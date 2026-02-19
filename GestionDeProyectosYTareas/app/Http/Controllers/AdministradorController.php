<?php

namespace App\Http\Controllers;
use App\Models\Desarrollador;
use App\Models\ProductOwner;
use App\Models\Administrador;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth; 

class AdministradorController extends Controller
{


#region FUNCIONES PRINCIPALES
    public function indexUsuarios(){ //Mostrar datos sobre usuarios
        $desarrolladores=Desarrollador::all()->map(function($desarrollador){
            $desarrollador->rol='Desarrollador';
            return $desarrollador;
        });
        
        $productOwners=ProductOwner::all()->map(function($productOwner){
            $productOwner->rol='ProductOwner';
            return $productOwner;
        });
        
        $administradores=Administrador::all()->map(function($administrador){
            $administrador->rol='Administrador';
            return $administrador;
        });

        $todos=$desarrolladores->concat($productOwners)->concat($administradores);
        $todos->sortBy('nombre')->values()->all();
        return response()->json($todos, 200);
    }

    public function storeUsuarios(Request $request) {

        if($request->rol=='Administrador'){
            $administrador_info = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|same:confirmed_password',
        ]);

        $administrador = new Administrador([
            'nombre'=>$administrador_info['nombre'],
            'email'=>$administrador_info['email'],
            'password'=>Hash::make($administrador_info['password']),
        ]);

        $administrador->save();
        return response()->json(['message'=>'Usuario registrado'], 200);

        } else if($request->rol=='Desarrollador'){
            $desarrollador_info = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|same:confirmed_password',
            'id_administrador'=>'requiered|exists:administrador,id',
        ]);

        $administrador = Administrador::where('email', $request->adminEmail)->first();

        $desarrollador = new Desarrollador([
            'nombre'=>$desarrollador_info['nombre'],
            'email'=>$desarrollador_info['email'],
            'password'=>Hash::make($desarrollador_info['password']),
            'id_administrador'=> $administrador->id,
        ]);

        $administrador->desarrolladores()->save($desarrollador);
        return response()->json(['message'=>'Usuario registrado'], 200);

        } else if($request->rol=='ProductOwner') {

        $productOwner_info = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|same:confirmed_password',
        ]);

        $administrador = Administrador::where('email', $request->adminEmail)->first();

        $productOwner = new ProductOwner([
            'nombre'=>$productOwner_info['nombre'],
            'email'=>$productOwner_info['email'],
            'password'=>Hash::make($productOwner_info['password']),
            'id_administrador'=> $administrador->id,
        ]);

        $administrador->productOwners()->save($productOwner);
        return response()->json(['message'=>'Usuario registrado'], 200);
        }
        return response()->json(['error' => 'No se pudo guardar el usuario nuevo'], 404);
    }

    public function showUsuarios($id, $rol) {//Muestra solo UNA cosa específica
        //$user = Auth::user();//Obtenemos el usuario que esta logeado actualmente 
        if($rol=='Administrador'){
            $admin = Administrador::findOrFail($id);
            return response()->json($admin, 200);
        } else if ($rol=='Desarrollador') {
            $desarrollador = Desarrollador::findOrFail($id);
            return response()->json($desarrollador, 200);
        } else if($rol=='ProductOwner') {
            $productOwner = ProductOwner::findOrFail($id);
            return response()->json($productOwner, 200);
        }
        return response()->json(['error' => 'Rol no encontrado'], 404);
    }

    public function updateUsuarios(Request $request, $rol, $id) {
        $passwordAntiguo = null;

        if($rol=='Administrador'){

        switch($request->oldRol) {
            case 'Desarrollador':
                $usuarioAntiguo = Desarrollador::where('email', $request->oldEmail)->first();
                $passwordAntiguo = $usuarioAntiguo->password;
                $usuarioAntiguo->delete();
                break;
            case 'ProductOwner':
                $usuarioAntiguo = ProductOwner::where('email', $request->oldEmail)->first();
                $passwordAntiguo = $usuarioAntiguo->password;
                $usuarioAntiguo->delete();
                break;
        }

            $admin_info = $request->validate([
                'nombre'=>'sometimes|max:100',
                'email'=>'sometimes|unique:administrador,email,'.$id,
                'password'=>'nullable|confirmed',
            ]);

            $updateData = collect($admin_info)->only(['nombre', 'email'])->toArray();

            if($request->filled('password')){
                $updateData['password']=Hash::make($admin_info['password']);
            } else {
                $updateData['password']=$passwordAntiguo;
            }

            Administrador::updateOrCreate(['id' => $id], $updateData);

            return response()->json(['message'=>'Usuario actualizado con exito'], 200);

        } else if ($rol=='Desarrollador') {

            switch($request->oldRol) {
            case 'Administrador':
                $usuarioAntiguo = Administrador::where('email', $request->oldEmail)->first();
                $passwordAntiguo = $usuarioAntiguo->password;
                $usuarioAntiguo->delete();
                break;
            case 'ProductOwner':
                $usuarioAntiguo = ProductOwner::where('email', $request->oldEmail)->first();
                $passwordAntiguo = $usuarioAntiguo->password;
                $usuarioAntiguo->delete();
                break;
            }

            $desarrollador_info = $request->validate([
                'nombre'=>'sometimes|max:100',
                'email'=>'sometimes|unique:desarrollador,email,'.$id,
                'password'=>'nullable|confirmed',
            ]);

            $updateData = collect($desarrollador_info)->only(['nombre', 'email'])->toArray();

            if($request->filled('password')){
                    $updateData['password']=Hash::make($desarrollador_info['password']);
            } else {
                $updateData['password']=$passwordAntiguo;
            }

            $administrador = Administrador::where('email', $request->adminEmail)->first();
            $updateData['id_administrador']=$administrador->id;
            $updateData['id_proyecto']=2;

            Desarrollador::updateOrCreate(
                ['id'=>$id],
                $updateData,
            );

            return response()->json(['message'=>'Usuario actualizado con exito'], 200);

        } else if($rol=='ProductOwner') {

            switch($request->oldRol) {
            case 'Desarrollador':
                $usuarioAntiguo = Desarrollador::where('email', $request->oldEmail)->first();
                $passwordAntiguo = $usuarioAntiguo->password;
                $usuarioAntiguo->delete();
                break;
            case 'Administrador':
                $usuarioAntiguo = Administrador::where('email', $request->oldEmail)->first();
                $passwordAntiguo = $usuarioAntiguo->password;
                $usuarioAntiguo->delete();
                break;
            }

            $productOwner_info = $request->validate([
                'nombre'=>'sometimes|max:100',
                'email'=>'sometimes|unique:product_owner,email,'.$id,
                'password'=>'nullable|confirmed',
            ]);

            $updateData = collect($productOwner_info)->only(['nombre', 'email'])->toArray();

            if($request->filled('password')){
                    $updateData['password']=Hash::make($productOwner_info['password']);
            } else {
                $updateData['password']=$passwordAntiguo;
            }

            $administrador = Administrador::where('email', $request->adminEmail)->first();
            $updateData['id_administrador']=$administrador->id;

            ProductOwner::updateOrCreate(
                ['id'=>$id],
                $updateData,
            );

            return response()->json(['message'=>'Usuario actualizado con exito'], 200);
        }
        return response()->json(['error' => 'No se pudo actualizar el usuario'], 404);
    }

    public function eliminarUsuario($rol, $id) {
        if($rol=='Administrador'){
            Administrador::findOrFail($id)->delete();
            return response()->json(['message'=>'Usuario eliminado con exito'], 200);
        } else if($rol=='Desarrollador') {
            Desarrollador::findOrFail($id)->delete();
            return response()->json(['message'=>'Usuario eliminado con exito'], 200);
        } else if($rol=='ProductOwner') {
            ProductOwner::findOrFail($id)->delete();
            return response()->json(['message'=>'Usuario eliminado con exito'], 200);
        }
        return response()->json(['message'=>'Error al eliminar el usuario'], 404);
    }
    #endregion
}
