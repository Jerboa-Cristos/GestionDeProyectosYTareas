<?php

namespace App\Http\Controllers;

use App\Models\ProductOwner;
use App\Models\Proyecto;
use Illuminate\Http\Request;

class ProductOwnerController extends Controller
{
    //1. Muestra el listado de todos los proyectos
    public function index()
    {
        $listado_proyectos = ProductOwner::all();
        return view('/product_owner_proyecto/index', compact('listado_proyectos'));
    }

    //2.Carga el formulario de creación de proyecto
    public function create(){
        return view('product_owner_proyecto/create');
    }

    //3.Guardar nuevo proyecto
    public function store(Request $request){
        $validar_datos = $request->validate([
            'nombre' => 'required|string|max:40',
            'descripcion' => 'required|string|max:300'
        ]);

        Proyecto::create($validar_datos);

        return redirect()->route('index');
    }

    //4.Muestra la información de un proyecto
    public function show($id){
        $product_owner = ProductOwner::findOrFail($id);
        return view('product_owner_proyecto/show', compact('product_owner'));
    }


    //5.Carga el formulario de edición de proyecto
    public function edit($id){
        $editar_datos_proyecto = Proyecto::findOrFail($id);

        return view('product_owner_proyecto/edit', compact('editar_datos_proyecto'));
    }

    //6.Actualiza la información de un proyecto
    public function update(Request $request, $id){
        $validar_datos = $request->validate([
            'nombre' => 'required|string|max:40',
            'descripcion' => 'required|string|max:300'
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

}
