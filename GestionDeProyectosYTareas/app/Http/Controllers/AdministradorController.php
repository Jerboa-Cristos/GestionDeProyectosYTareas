<?php

namespace App\Http\Controllers;
use App\Models\Desarrollador;
use App\Models\ProductOwner;
use App\Models\Administrador;
use App\Models\Proyecto;
use Illuminate\Http\Request;
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
            $productOwner->rol='Product Owner';
            return $productOwner;
        });
        
        $administradores=Administrador::all()->map(function($administrador){
            $administrador->rol='Administrador';
            return $administrador;
        });

        $todos=$desarrolladores->concat($productOwners)->concat($administradores);
        $todos=$todos->sortBy('nombre')->values()->all();
        return response()->json($todos, 200);
    }

    public function storeUsuarios(Request $request) {
         if($request->rol=='Desarrollador'){
                    $usuarios = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
            'id_administrador'=>'required|exists:administrador,id',
            'id_proyecto'=>'required|exists:proyecto,id',
        ]);

        $administrador = Administrador::findOrFail($request->get('id'));

        $desarrollador = new Desarrollador([
            'nombre'=>$usuarios('nombre'),
            'email'=>$usuarios('email'),
            'password'=>$usuarios('password'),
            'id_administrador'=> 1, //Administrador::Auth()->id(), por ahora esta hardcodeado
            'id_proyecto'=> 1, //Proyecto::get('id'), por ahora esta hardcodeado
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);

        $administrador->desarrollador()->save($desarrollador);
        return response()->json(['message'=>'Usuario registrado'], 200);

         } else if($request->rol=='Product Owner') {

        $usuarios = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
            'id_administrador'=>'required|exists:administrador,id',
            'fecha_alta'=>'required|date',
        ]);

        $administrador = Administrador::findOrFail($request->get('id'));

        $productOwner = new ProductOwner([
            'nombre'=>$usuarios('nombre'),
            'email'=>$usuarios('email'),
            'password'=>$usuarios('password'),
            'id_administrador'=> 1, //Administrador::Auth()->id(), por ahora esta hardcodeado
            'fecha_alta'=>date('Y-m-d'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);

        $administrador->product_owner()->save($productOwner);
        return response()->json(['message'=>'Usuario registrado'], 200);
         }
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

    public function updateUsuarios(Request $request, $id) {
        if($request->rol=='administrador'){

            $admin_info = $request->validate([
                'nombre'=>'required|max:100',
                'email'=>'required|unique:administrador|email',
                'password'=>'required|confirmed',
            ]);
            Administrador::findOrFail($id)->update([
                'nombre'=>$admin_info['nombre'],
                'email'=>$admin_info['email'],
                'password'=>$admin_info['password'],
            ]);


            //Necesito que me busque al mismo usuario en otras tablas para eliminarlo en el caso de si cambio de rol.
            Desarrollador::where('email', $request->email)->delete();
            ProductOwner::where('email', $request->email)->delete();

        } else if ($request->rol=='desarrollador') {

            $desarrollador_info = $request->validate([
                'nombre'=>'required|max:100',
                'email'=>'required|unique:desarrollador|email',
                'password'=>'required|confirmed',
                'id_administrador'=>'required|exists:administrador,id',
                'id_proyecto'=>'required|exists:proyecto,id',
            ]);
            Desarrollador::findOrFail($id)->update([
                'nombre'=>$desarrollador_info['nombre'],
                'email'=>$desarrollador_info['email'],
                'password'=>$desarrollador_info['password'],
                'id_administrador'=> 1, //Administrador::Auth()->id(), por ahora esta hardcodeado
                'id_proyecto'=> 1, //Proyecto::get('id'), por ahora esta hardcodeado
            ]);

            Administrador::where('email', $request->email)->delete();
            ProductOwner::where('email', $request->email)->delete();

        } else if($request->rol=='product_owner') {

            $productOwner_info = $request->validate([
                'nombre'=>'required|max:100',
                'email'=>'required|unique:product_owner|email',
                'password'=>'required|confirmed',
                'id_administrador'=>'required|exists:administrador,id',
                'fecha_alta'=>'required|date',
            ]);
            ProductOwner::findOrFail($id)->update([
                'nombre'=>$productOwner_info['nombre'],
                'email'=>$productOwner_info['email'],
                'password'=>$productOwner_info['password'],
                'id_administrador'=> 1, //Administrador::Auth()->id(), por ahora esta hardcodeado
            ]);

            Desarrollador::where('email', $request->email)->delete();
            Administrador::where('email', $request->email)->delete();

        }
        return response()->json(['message'=>'Usuario actualizado con exito'], 200);
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
