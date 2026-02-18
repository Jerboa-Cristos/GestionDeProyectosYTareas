<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use App\Models\Estado;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    public function indexTarea() {
        $tareas = Tarea::all();
        return response()->json($tareas, 200);
    }

    public function updateTarea(Request $request, $id) {
        $tareaUpdate = Tarea::findOrFail($id);

        $tarea=$request->validate([
            'nombre'=>'required|max:255',
            'tipo'=>'required|in:Backend,Frontend,Diseño,Despliegue,Testing',
            'descripcion'=>'nullable|min:3|max:1000',
            'fecha_fin'=>'nullable|date|after:'.$tareaUpdate->created_at->toDateTimeString(),
        ]);



        //Preguntar sobre como cambiar el estado en la tabla de muchos a muchos
    }

    public function showTarea($id) {
        $tarea = Tarea::findOrFail($id);
        return response()->json($tarea, 200);
    }

//ESTADO
#region
    //Mostrar todos los Estados
    public function indexEstado(){
        $estados = Estado::all();
        return response()->json($estados, 200);
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
