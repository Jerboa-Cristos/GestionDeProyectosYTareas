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

//ADMINISTRADOR
#region

    public function indexAdministrador(){ //Mostrar datos sobre desarrolladores solo
        $administradores=Administrador::all();
        return view('administrador.index_Admin',['administradores'=>$administradores]);
    }

    public function show($id) {
        //$user = Auth::user();//Obtenemos el usuario que esta logeado actualmente 
        $admin = Administrador::findOrFail($id);
        return view('administrador.show_Admin')->with('administrador', $admin);
    }

    public function edit($id) {
        $admin=Administrador::findOrFail($id);
        return view('administrador.edit_Admin')->with('administrador', $admin);
    }

    public function update(Request $request, $id) {
        $admin_info = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique|email',
            'password'=>'required|confirmed',
        ]);
        Administrador::find($id)->firstOrFail()->update([
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
        //$administradores=Administrador::get('id'); //Para el administrador no es necesario, puedo usar su Auth. 
        return view('administrador.create_Admin');
    }

    public function indexUsuarios(){ //Mostrar datos sobre usuarios
        $desarrolladores=Desarrollador::all();
        $productOwners=ProductOwner::all();
        $administradores=Administrador::all();
        $proyectos=Proyecto::all();
        return view('administrador.index_Admin',['desarrolladores'=>$desarrolladores, 'product_owners'=>$productOwners, 'administradores'=>$administradores, 'proyectos'=>$proyectos]);
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
            'id_proyecto'=>'required|exists:proyecto,id',
            'fecha_alta'=>'required|date',
        ]);

        $administrador = Administrador::findOrFail($request->get('id'));

        $desarrollador = new Desarrollador([
            'nombre'=>$usuarios('nombre'),
            'email'=>$usuarios('email'),
            'password'=>$usuarios('password'),
            'id_administrador'=> 1, //Administrador::Auth()->id(), por ahora esta hardcodeado
            'id_proyecto'=> 1, //Proyecto::get('id'), por ahora esta hardcodeado
            'fecha_alta'=>date('Y-m-d'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);

        $administrador->desarrollador()->save($desarrollador);
        return redirect()->back();
    }

    public function showDesarrollador($id) {//Muestra solo UNA cosa específica
        $desarrollador = Desarrollador::findOrFail($id);
        return view('administrador.show_Admin')->with('desarrollador', $desarrollador);
    }

    public function editDesarrollador($id) {//Formulario para editar usuarios. SOlo devuelve la vista al formulario
        $desarrollador=Desarrollador::findOrFail($id);
        $administradores=Administrador::get('id');
        return view('administrador.edit_Admin', ['desarrollador'=>$desarrollador, 'administradores'=>$administradores]);
    }

    //Editar usuarios
    public function updateDesarrollador(Request $request, $id) {
            $usuarios = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
            'id_administrador'=>'required|exists:administrador,id',
            'fecha_alta'=>'required|date',
        ]);

        Desarrollador::find($id)->firstOrFail()->update([
            'nombre'=>$usuarios('nombre'),
            'email'=>$usuarios('email'),
            'password'=>$usuarios('password'),
            'id_administrador'=> 1, //Administrador::Auth()->id(), por ahora esta hardcodeado
            'fecha_alta'=>date('Y-m-d'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);
        return redirect()->back();

    }

    //Borrar usuarios
    public function eliminarDesarrollador($id) {
        Desarrollador::findOrFail($id)->delete();
        return redirect()->back()->with('success','Eliminado con exito');
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
        return redirect()->back();
    }

    public function showProductOwner($id) {//Muestra solo UNA cosa específica
        $productOwner=ProductOwner::findOrFail($id);
        return view('administrador.show_Admin')->with('productOwner', $productOwner);
    }

    public function editProductOwner($id) {//Formulario para editar usuarios. SOlo devuelve la vista al formulario
        $productOwner=ProductOwner::findOrFail($id);
        $administradores=Administrador::get('id');
        return view('administrador.edit_Admin', ['product_owners'=>$productOwner, 'administradores'=>$administradores]);
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
            'id_administrador'=> 1, //Administrador::Auth()->id(), por ahora esta hardcodeado
            'fecha_alta'=>date('Y-m-d'),
            'created_at'=>date('Y-m-d'),
            'updated_at'=>date('Y-m-d'),
        ]);
        return redirect()->back();
    }

    //Borrar usuarios
    public function eliminarProductOwner($id) {
        ProductOwner::findOrFail($id)->delete();
        return redirect()->back()->with('success','Eliminado con exito');
    }
#endregion
}
