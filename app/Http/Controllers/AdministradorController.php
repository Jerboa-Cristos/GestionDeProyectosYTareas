<?php

namespace App\Http\Controllers;
use App\Models\Desarrollador;
use App\Models\ProductOwner;
use App\Models\Administrador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class AdministradorController extends Controller
{

//ADMINISTRADOR
#region

    public function indexAdministrador(){ //Mostrar datos sobre desarrolladores solo
        $administradores=Administrador::all();
        return view('administrador.index_Admin',['administradores'=>$administradores]);
    }

    public function show(Request $request) {
        //$user = Auth::user();//Obtenemos el usuario que esta logeado actualmente 
        $admin = Administrador::findOrFail($request->get('id'));
        return view('administrador.show_Admin')->with('administrador', $admin);
    }

    public function edit(Request $request) {
        $admin=Administrador::findOrFail($request->get('id'));
        return view('administrador.edit_Admin')->with('administrador', $admin);
    }

    public function update(Request $request) {
        $admin_info = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique|email',
            'password'=>'required|confirmed',
        ]);
        Administrador::find($request->get('id'))->firstOrFail()->update([
            'nombre'=>$admin_info('nombre'),
            'email'=>$admin_info('email'),
            'password'=>$admin_info('password'),
            'fecha_alta'=>date('Y-m-d'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);
    }
#endregion

    public function create() {//FORMULARIO para crear la entidad. Solo devuelve la vista al formulario
        //Le tenemos que mandar toda la información que necesitará para crear a los usuarios ya de base
        //La información de administradores, su id. 
        $administradores=Administrador::get('id');
        return view('administrador.create_Admin')->with('administradores', $administradores);
    }

    public function indexUsuarios(){ //Mostrar datos sobre usuarios
        $desarrolladores=Desarrollador::all();
        $productOwners=ProductOwner::all();
        $administradores=Administrador::all();
        return view('administrador.index_Admin',['desarrolladores'=>$desarrolladores, 'product_owners'=>$productOwners, 'administradores'=>$administradores]);
    }

//DESARROLLADOR
#region
    public function indexDesarrolladores(){ //Mostrar datos sobre desarrolladores solo
        $desarrolladores=Desarrollador::all();
        return view('administrador.index_Admin',['desarrollador'=>$desarrolladores]);
    }

    //Crear desarrolladores
    public function guardarDesarrollador(Request $request) {
        $usuarios = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
            'id_administrador'=>'required|exists:administrador,id',
            'fecha_alta'=>'required|date',
        ]);
        Desarrollador::create([
            'nombre'=>$usuarios('nombre'),
            'email'=>$usuarios('email'),
            'password'=>$usuarios('password'),
            'id_administrador'=>$usuarios('id_administrador'),
            'fecha_alta'=>date('Y-m-d'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);
    }

    public function showDesarrollador(Request $request) {//Muestra solo UNA cosa específica
        $desarrollador = Desarrollador::findOrFail($request->get('id'));
        return view('administrador.show_Admin')->with('desarrollador', $desarrollador);
    }

    public function editDesarrollador(Request $request) {//Formulario para editar usuarios. SOlo devuelve la vista al formulario
        $desarrollador=Desarrollador::findOrFail($request->get('id'));
        $administradores=Administrador::get('id');
        return view('/administrador.edit_Admin', ['desarrolladores'=>$desarrollador, 'administradores'=>$administradores]);
    }

    //Editar usuarios
    public function updateDesarrollador(Request $request) {
            $usuarios = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
            'id_administrador'=>'required|exists:administrador,id',
            'fecha_alta'=>'required|date',
        ]);
        Desarrollador::find($request->get('id'))->firstOrFail()->update([
            'nombre'=>$usuarios('nombre'),
            'email'=>$usuarios('email'),
            'password'=>$usuarios('password'),
            'id_administrador'=>$usuarios('id_administrador'),
            'fecha_alta'=>date('Y-m-d'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);
    }

    //Borrar usuarios
    public function eliminarDesarrollador(Request $request) {
        Desarrollador::findOrFail($request->get('id'))->firstOrFail()->delete();
    }
#endregion

//PRODUCT OWNER
#region
    public function indexProductOwner(){ //Mostrar datos sobre usuarios
        $productOwners=ProductOwner::all();
        return view('administrador.index_Admin',['product_owner'=>$productOwners]);
    }

            //Crear usuarios
    public function guardarProductOwner(Request $request) {
        $usuarios = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
            'id_administrador'=>'required|exists:administrador,id',
            'fecha_alta'=>'required|date',
        ]);
        ProductOwner::create([
            'nombre'=>$usuarios('nombre'),
            'email'=>$usuarios('email'),
            'password'=>$usuarios('password'),
            'id_administrador'=>$usuarios('id_administrador'),
            'fecha_alta'=>date('Y-m-d'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);
    }

    public function showProductOwner(Request $request) {//Muestra solo UNA cosa específica
        $productOwner=ProductOwner::findOrFail($request->get('id'));
        return view('administrador.show_Admin')->with('productOwner', $productOwner);
    }

    public function editProductOwner(Request $request) {//Formulario para editar usuarios. SOlo devuelve la vista al formulario
        $productOwner=ProductOwner::findOrFail($request->get('id'));
        $administradores=Administrador::get('id');
        return view('/administrador.edit_Admin', ['product_owners'=>$productOwner, 'administradores'=>$administradores]);
    }

    //Editar usuarios
    public function updateProductOwner(Request $request, $id) {
            $usuarios = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
            'id_administrador'=>'required|exists:administrador,id',
            'fecha_alta'=>'required|date',
        ]);
        ProductOwner::find($id)->firstOrFail()->update([
            'nombre'=>$usuarios('nombre'),
            'email'=>$usuarios('email'),
            'password'=>$usuarios('password'),
            'id_administrador'=>$usuarios('id_administrador'),
            'fecha_alta'=>date('Y-m-d'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);
    }

    //Borrar usuarios
    public function eliminarProductOwner(Request $request) {
        ProductOwner::findOrFail($request->get('id'))->firstOrFail()->delete();
    }
#endregion
}
