<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use App\Models\Estado;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    public function indexTarea() { //Para poder listar las tareas
        $tareas = Tarea::all();
        return view('tareas.tablero', ['tareas'=>$tareas]);
    }

    public function showTarea($id) {
        $tarea = Tarea::findOrFail($id);
        return view('tareas.detalles_tarea')->with('tarea', $tarea);
    }

    public function updateTarea(Request $request, $id_tarea, $id_estado) {
        Tarea::find($id_tarea)->firstOrFail()->update([
            'tipo'=>$request->get('tipo'),
            'descripcion'=>$request->get('descripcion'), 
            'fecha_fin'=>$request->get('fecha_fin'),
        ]);
        //Preguntar sobre como cambiar el estado en la tabla de muchos a muchos
    }

//ESTADO, esta conectado directamente a tarea. Como debería manejarlo?
//Retornar un view a la tarea mismo? 
#region
    public function indexEstado(){
        $estados = Estado::all();
    }

    public function storeEstado(Request $request) {
        Estado::create($request);
    }

    public function showEstado($id_tarea) {
        $estado = Estado::findOrFail($id_tarea);
        //A que vista debe devolver? A la de Tarea?
    }

    public function updateEstado(){

    }
#endregion
}
