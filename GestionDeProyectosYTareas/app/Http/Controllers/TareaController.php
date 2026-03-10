<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    //EL CONTROLADOR DE TAREAS SOLO PARA UN DESAROLLADOR
    public function indexTareasDesarrollador() {
        $desarrollador = auth('desarrollador')->user();
        //Es una función que debe pillar todas las tareas de un proyecto concreto. 
        //Accede al modelo Tarea, busca mediante la relación con el Sprint
        //query es la instancia de la consulta que apunta a la tabla Sprint
        //Hace una busqueda en la base de datos: usa el id_proyecto que se le ha pasado. 
        //Busca los sprints donde su id_proyecto conincida con el que se le ha pasado
        //Devuelve los resultados + guarda los sprints para el futuro + los guarda
        $tareas = Tarea::whereHas('sprint', function ($query) use ($desarrollador) {
            $query->where('id_proyecto', $desarrollador->id_proyecto);
        })->with('sprint', 'desarrollador')->get();

        return response()->json($tareas, 200);
    }

    public function updateTareaDesarrollador($id, Request $request) {  
            $desarrollador = auth('desarrollador')->user();

            $tarea=$request->validate([
                'estado'=> 'required|in:Por Hacer,En Curso,En Revision,Finalizado',
            ]);

            $desarrollador->tarea()->findOrFail($id)->update([
                'estado'=>$tarea['estado'],
            ]);

        try{

        } catch(\Exception $e) {
            return response()->json(['message'=>'NO se pudo hacer Update de tarea'], 404);
        }
        return response()->json(['message'=>'Tarea Actualizada'], 200);
    }

    public function showTareaDesarrollador($id) {
        $desarrollador = auth('desarrollador')->user();
        $tarea = $desarrollador->tarea()->findOrFail($id);
        return response()->json($tarea, 200);
    }

    //COSA DE PRODUCT OWNER
    public function tareasProductOwner(Request $request) {
        $product_owner = auth('product_owner')->user();
        
        $tareas = Tarea::wherehas('sprint.proyecto', function($proyectoConsulta) use($product_owner) {
            $proyectoConsulta->where('id_product_owner', $product_owner->id);
        })->with('sprint.proyecto')->orderBy('updated_at', 'desc')->get();

        return response()->json($tareas);
        
    }
}
