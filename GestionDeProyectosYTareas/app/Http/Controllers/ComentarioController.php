<?php

namespace App\Http\Controllers;

use App\Models\Comentario;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class ComentarioController extends Controller
{

    public function indexComentario($idTarea) {
        try{
            $comentarios=Comentario::where('id_tarea', $idTarea)->with('autor')->orderBy('created_at', 'asc')->get();
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo pasar el listado de comentarios por: '. $e->getMessage()], 500);
        }
        return response()->json($comentarios, 200);
    }

    public function guardarComentario(Request $request) {
        try{
            $user = auth('desarrollador')->user();

            $comentarioNuevo = $request->validate([
                'texto'=>'required|max:300',
                'id_tarea'=>'required|exists:tarea,id',
            ]);

            $comentario = Comentario::create([
                'texto'=>$comentarioNuevo['texto'],
                'id_tarea'=>$comentarioNuevo['id_tarea'],
                'autor_id'=>$user->id,
                'autor_type'=>get_class($user),
            ]);

            $comentario->load('autor');
            
        }catch(\Exception $e) {
            return response()->json(['error' => 'No se pudo guardar el comentario por: '. $e->getMessage()], 500);
        }
        return response()->json($comentario, 200);
    }

    public function updateComentario(Request $request, $id) { 
        try{
            $comentarioNuevo = $request->validate([
                'texto'=>'required|max:300',
            ]);
            
            Comentario::findOrFail($id)->update([
                'texto'=>$comentarioNuevo['texto'],
            ]);
        }catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo actualizar el comentario' . $e->getMessage()], 500);
        }
        return response()->json(['message'=>'Comentario actualizado con exito'], 200);
    }

    public function eliminarComentario($id) {
        try{
            Comentario::findOrFail($id)->delete();
        }catch(\Exception $e) {
            return response()->json(['error' => 'No se pudo eliminar el comentario' . $e->getMessage()], 500);
        }
        return response()->json(['message'=>'Comentario eliminado con exito'], 200);
    }
}
