import { eliminarComentario } from '../../services/comentarioService'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import toast from "react-hot-toast"

export function AlertDeleteComent({ id, token, onDeleteSuccess }) {

    const eliminarComent = () => {
        toast.promise(eliminarComentario(id, token), {
            loading: 'Eliminando comentario...',
            success: 'Comentario eliminado con éxito.',
            error: 'No se pudo eliminar el comentario.'
        }).then(() => {
            onDeleteSuccess(id);
        }).catch(err => {
            console.error("Error al eliminar el comentario:", err);
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                    <span className="text-white/70 hover:text-warning transition-all cursor-pointer">Eliminar</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro de eliminar este comentario?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. El comentario será eliminado permanentemente.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => eliminarComent()} className="bg-red-500 hover:bg-red-600 text-white">
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}