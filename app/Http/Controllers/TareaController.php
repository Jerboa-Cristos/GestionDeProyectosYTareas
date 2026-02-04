<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use App\Models\Estado;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    //Request - devuelve todo de la página, incluyendo el id
    public function indexTarea() { //Para poder listar las tareas
        $tareas = Tarea::all();
        return view('tareas.tablero', ['tareas'=>$tareas]);
    }

    public function showTarea(Request $request) {
        $tarea = Tarea::findOrFail($request->get('id'));
        return view('tareas.detalles_tarea')->with('tarea', $tarea);
    }

    public function updateTarea(Request $request) {

        Tarea::find($request->get('id'))->firstOrFail()->update([
            'tipo'=>$request->get('tipo'),
            'descripcion'=>$request->get('descripcion'), 
            'fecha_fin'=>$request->get('fecha_fin'),
        ]);
        //Preguntar sobre como cambiar el estado en la tabla de muchos a muchos
    }

//ESTADO
#region
    //Mostrar todos los Estados
    public function indexEstado(){
        $estados = Estado::all();
        return view('tareas.detalles_tarea')->with('estados', $estados);
    }

    //Guardar el estado actual de la tarea
    public function storeEstado(Request $request) {
        Estado::create($request);
    }
    
    //Mostrar el estado de la tarea
    public function showEstado($id_tarea) {
        $estados = Estado::findOrFail($id_tarea);
        return view('tareas.detalles_tarea')->with('estados', $estados);
    }

    //
    public function updateEstado(Request $request){
        Estado::find($request->get('id'))->update([
            'tipo'=>$request->get('tipo'),
        ]);
    }
#endregion
}
