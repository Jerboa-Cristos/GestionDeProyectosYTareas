<?php

namespace App\Http\Controllers;

use App\Models\Comentario;

use Illuminate\Http\Request;

class ComentarioController extends Controller
{

    public function indexComentario() {
        try{
            $comentarios=Comentario::all();
            $comentarios->sortBy('created_at')->values()->all();
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo pasar el listado de comentarios'], 404);
        }
        return response()->json($comentarios, 200);
    }

    public function guardarComentario(Request $request) {
        try{
            $comentarioNuevo = $request->validate([
                'texto'=>'required|max:300',
                'id_tarea'=>'required|exists:tareas,id',
                'autor_id'=>'requiered|integer',
                'autor_type'=>'requiered|in:use App\Models\Desarrollador,use App\Models\ProductOwner'
            ]);

            Comentario::create([
                'texto'=>$comentarioNuevo['texto'],
                'id_tarea'=>$comentarioNuevo['id_tarea'],
                'autor_id'=>$comentarioNuevo['autor_id'],
                'autor_type'=>$comentarioNuevo['autor_type'],
            ]);

        }catch(\Exception $e) {
            return response()->json(['error' => 'No se pudo guardar el comentario'], 404);
        }
        return response()->json(['message'=>'Comentario guardado con exito'], 200);
    }

    public function showComentario($id) {
        try{
            $comentario = Comentario::findOrFail($id);
        }catch(\Exception $e) {          
            return response()->json(['error' => 'No se puede mostrar el comentario'], 404);
        }
        return response()->json($comentario, 200);
    }

    public function updateComentario(Request $request, $id) { 
        try{
            $comentarioNuevo = $request->validate([
                'texto'=>'required|max:300',
                'autor_id'=>'requiered|integer',
                'autor_type'=>'requiered|in:use App\Models\Desarrollador,use App\Models\ProductOwner',
            ]);
            Comentario::findOrFail($id)->update([
                'texto'=>$comentarioNuevo['texto'],
                'autor_id'=>$comentarioNuevo['autor_id'],
                'autor_type'=>$comentarioNuevo['autor_type'],
            ]);
        }catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo actualizar el comentario'], 404);
        }
        return response()->json(['message'=>'Comentario actualizado con exito'], 200);
    }

    public function eliminarComentario($id) {
        try{
            Comentario::findOrFail($id)->delete();
        }catch(\Exception $e) {
            return response()->json(['error' => 'No se pudo eliminar el comentario'], 404);
        }
        return response()->json(['message'=>'Comentario eliminado con exito'], 200);
    }
}
