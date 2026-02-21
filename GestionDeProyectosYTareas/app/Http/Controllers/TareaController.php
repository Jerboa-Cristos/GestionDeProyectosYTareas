<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    //EL CONTROLADDOR DE TAREAS SOLO PARA UN DESAROLLADOR
    public function indexTareaParaUsuario($idUs) {
        $tareas = Tarea::all()->where("id_desarrollador", $idUs);
        return response()->json($tareas, 200);
    }

    public function indexTareaParaSprint($idSp) {
        $tareas = Tarea::all()->where("id_sprint", $idSp);
        return response()->json($tareas, 200);
    }

    public function updateTarea(Request $request, $id) {
        try{
            $tareaUpdate = Tarea::findOrFail($id);

            $tarea=$request->validate([
            'nombre'=>'required|max:255',
            'tipo'=>'required|in:Backend,Frontend,Diseño,Despliegue,Testing',
            'estado'=> 'requiered|in:Por Hacer,En Curso,En Revision,Finalizado',
            'descripcion'=>'nullable|min:3|max:1000',
            'fecha_fin'=>'nullable|date|after:'.$tareaUpdate->created_at->toDateTimeString(),
            ]);

            Tarea::findOrFail($id)->update([
                'nombre'=>$tarea['nombre'],
                'tipo'=>$tarea['tipo'],
                'estado'=>$tarea['estado'],
                'descripcion'=>$tarea['descripcion'],
                'fecha_fin'=>$tarea['fecha_fin'],
            ]);

        } catch(\Exception $e) {
            return response()->json(['message'=>'NO se pudo hacer Update de tarea'], 404);
        }
        return response()->json(['message'=>'Tarea Actualizada'], 200);
    }

    public function showTarea($id) {
        $tarea = Tarea::findOrFail($id);
        return response()->json($tarea, 200);
    }


    public function tareasProductOwner(Request $request) {
        $product_owner = auth('product_owner')->user();
        
        $tareas = Tarea::wherehas('sprint.proyecto', function($proyectoConsulta) use ($product_owner) {
            $proyectoConsulta->where('id_product_owner', $product_owner->id);
        })->orderBy('updated_at', 'desc')->get();

        return response()->json($tareas);
        
    }
}
