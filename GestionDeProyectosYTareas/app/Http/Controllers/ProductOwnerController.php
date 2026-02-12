<?php

namespace App\Http\Controllers;

use App\Models\ProductOwner;
use App\Models\Proyecto;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;


class ProductOwnerController extends Controller
{
    //1. Muestra el listado de todos los proyectos
    public function index()
    {
        $listado_proyectos = Proyecto::all();
        return view('product_owner_proyecto.index', compact('listado_proyectos'));
    }

    //2.Carga el formulario de creación de proyecto
    public function create(){
        return view('product_owner_proyecto.create');
    }

    //3.Guardar nuevo proyecto
    public function store(Request $request){
        $validar_datos = $request->validate([
            'nombre' => 'required|string|max:40',
            'descripcion' => 'required|string|max:300',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date',

        ]);

        //cuando tengamos login
        $usuario = Auth::user();
        $id = Auth::id();

        //solo un ejemplo para probar la relacion entre proyecto y product owner, luego se debe cambiar por el id del usuario logeado
        $product_owner = ProductOwner::findOrFail(1);

        $proyecto = new Proyecto([
            'nombre' => $validar_datos['nombre'],
            'descripcion' => $validar_datos['descripcion'],
            'fecha_inicio' => $validar_datos['fecha_inicio'],
            'fecha_fin' => $validar_datos['fecha_fin'],
            'id_product_owner' => 1
        ]);

        //relacion para guardar proyecto
        $product_owner->proyectos()->save($proyecto);

        return redirect()->route('index');
    }



    //4.Muestra la información de un proyecto
    public function show($id){
        $proyecto = Proyecto::findOrFail($id);
        return view('product_owner_proyecto.show', compact('proyecto'));
    }


    //5.Carga el formulario de edición de proyecto
    public function edit($id){
        $editar_datos_proyecto = Proyecto::findOrFail($id);

        return view('product_owner_proyecto.edit', compact('editar_datos_proyecto'));
    }

    //6.Actualiza la información de un proyecto
    public function update(Request $request, $id){
        $validar_datos = $request->validate([
            'nombre' => 'required|string|max:40',
            'descripcion' => 'required|string|max:300',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date'
        ]);

        Proyecto::findOrFail($id)->update($validar_datos);
        return redirect()->route('index');
    }

    //7.Elimina un proyecto
    public function destroy($id){
        $datos = Proyecto::findOrFail($id);
        $datos->delete();

        return redirect()->route('index');
    }

    //MOSTRAR INFORMACION DE UN SOLO PRODUCT_OWNER

    public function show_product_owner(Request $request) {
        //$user = Auth::user();//Obtenemos el usuario que esta logeado actualmente

        $product_owner = ProductOwner::findOrFail($request->get('id'));
        return view('administrador.show_Admin')->with('product_owner', $product_owner);
    }

    public function edit_product_owner(Request $request) {
        $product_owner= ProductOwner::findOrFail($request->get('id'));
        return view('/administrador.edit_Admin')->with('product_owner', $product_owner);
    }

    public function update_product_owner(Request $request) {
        ProductOwner::find($request->get('id'))->firstOrFail()->update([
            'nombre'=>$request->get('nombre'),
            'email'=>$request->get('email'),
            'password'=>$request->get('password')
        ]);

        
    }

}

