import { eliminarUsuario } from '../../services/adminService';
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
import { Trash2 } from 'lucide-react';

export function AlertDeleteUser({ id, rol, token, onUserDeleted }) {

    const eliminarPersona = () => {
        toast.promise(eliminarUsuario(id, rol, token), {
            loading: 'Eliminando usuario...',
            success: 'Usuario eliminado con éxito.',
            error: 'No se pudo eliminar el usuario.'
        }).then(() => {
            onUserDeleted();
        }).catch(err => {
            console.error("Error al eliminar el usuario:", err);
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-warningDark text-white p-3 rounded-full hover:bg-warning transition-transform shadow-md hover:scale-105"
                title="Eliminar usuario">
                <Trash2 size={24} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro de eliminar este usuario?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. El usuario será eliminado permanentemente.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => eliminarPersona()} className="bg-red-500 hover:bg-red-600 text-white">
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}
