<?php

namespace App\Http\Controllers;

use App\Models\ProductOwner;
use App\Models\Proyecto;
use Illuminate\Http\Request;

class ProductOwnerController extends Controller
{
    public function index()
    {
        $product_owner = ProductOwner::all();
        return view('/product_owner/index', compact('product_owner'));
    }


    public function crearProyecto(Request $request){
        $proyectos = $request->validate([
            'nombre' => 'required|string|max:40',
            'descripcion' => 'required|string|max:300'
        ]);

        Proyecto::create($proyectos);
        
        return redirect()->route('index');
    }

    public function editarProyecto($id){
        $datos = Proyecto::findOrFail($id);
    }

    public function eliminarProyecto($id){
        $datos = Proyecto::findOrFail($id);
        $datos->delete();
        //faltaria añadir el return para redirigir a al listado de usuario (linea de abajo)
        //return redirect()->route('listado.usuarios');
    }









}
