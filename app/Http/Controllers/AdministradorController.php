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
    public function show($id) {
        //$user = Auth::user();//Obtenemos el usuario que esta logeado actualmente 

        $admin = Administrador::findOrFail($id);
        return view('administrador.show_Admin')->with('administrador', $admin);
    }

    public function edit($id) {
        $admin=Administrador::findOrFail($id);
        return view('/administrador.edit_Admin')->with('administrador', $admin);
    }

    public function update(Request $request, $id) {
        Administrador::find($id)->firstOrFail()->update([
            'nombre'=>$request->get('nombre'),
            'email'=>$request->get('email'),
            'password'=>$request->get('password')
        ]);
    }
#endregion

    public function create() {//FORMULARIO para crear la entidad. Solo devuelve la vista al formulario
        return view('administrador.create_Admin');
    }

//DESARROLLADOR
#region
    public function indexDesarrollador(){ //Mostrar datos sobre usuarios
        $desarrolladores=Desarrollador::all();
        return view('administrador.index_Admin',['desarrolador'=>$desarrolladores]);
    }

        //Crear usuarios
    public function guardarDesarrollador(Request $request) {
        $usuarios = $request->validate([
            'nombre'=>'required|max:100',
            'email'=>'required|unique:users|email',
            'password'=>'required|confirmed',
        ]);
        Desarrollador::create($usuarios);
        //Faltaria la redirección con el mensaje de success
    }

    public function showDesarrollador($id) {//Muestra solo UNA cosa específica
        $desarrollador = Desarrollador::findOrFail($id);
        return view('administrador.show_Admin')->with('desarrollador', $desarrollador);
    }

    public function editDesarrollador($id) {//Formulario para editar usuarios. SOlo devuelve la vista al formulario
        $desarrollador=Desarrollador::findOrFail($id);
        return view('/administrador.edit_Admin')->with('desarrollador', $desarrollador);
    }

    //Editar usuarios
    public function updateDesarrollador(Request $request, $id) {
        Desarrollador::find($id)->firstOrFail()->update([
            'nombre'=>$request->get('nombre'),
            'email'=>$request->get('email'),
            'password'=>$request->get('password')
        ]);
    }

    //Borrar usuarios
    public function eliminarDesarrollador($id) {
        Desarrollador::findOrFail($id)->firstOrFail()->delete();
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
        ]);
        ProductOwner::create($usuarios);
        //Faltaria la redirección con el mensaje de success
    }

    public function showProductOwner($id) {//Muestra solo UNA cosa específica
        $productOwner=ProductOwner::findOrFail($id);
        return view('administrador.show_Admin')->with('productOwner', $productOwner);
    }

    public function editProductOwner($id) {//Formulario para editar usuarios. SOlo devuelve la vista al formulario
        $productOwner=ProductOwner::findOrFail($id);
        return view('/administrador.edit_Admin')->with('productOwner', $productOwner);
    }

    //Editar usuarios
    public function updateProductOwner(Request $request, $id) {
        ProductOwner::findOrFail($id)->firstOrFail()->update([
            'nombre'=>$request->get('nombre'),
            'email'=>$request->get('email'),
            'password'=>$request->get('password')
        ]);
    }

    //Borrar usuarios
    public function eliminarProductOwner($id) {
        ProductOwner::findOrFail($id)->firstOrFail()->delete();
    }
#endregion
}
