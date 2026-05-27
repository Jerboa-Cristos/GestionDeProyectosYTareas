import { useState } from 'react'
import {eliminarComentario, updateComentario} from '../../services/comentarioService'
import { User2, Trash2, Edit2 } from "lucide-react"


const ElementComentario = ({id, user, text, onDeleteSuccess, onUpdateSuccess}) => {
    const token = localStorage.getItem('token');
    const actualUser = JSON.parse(localStorage.getItem('user'));
    const idUser = actualUser.id;
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState({
        id: id,
        texto: text, 
    })

    const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    })}

    const EliminarComentario = async (id, token) => {
        try {
            await eliminarComentario(id, token)
            console.log('Comentario eliminado con éxito');
            onDeleteSuccess(id);
        }catch(err) {
            console.error("Error al eliminar el comentario:", err);
            alert('No se pudo eliminar el comentario.')
        }
    }

    const UpdateComentario = (e) => {
        e.stopPropagation()
        if(editando) {
            updateComentario(id, formData, token).then(res => {
                console.log('Comentario actualizado')
                onUpdateSuccess(id, formData.texto)
            }).catch(err=>{
                console.error('Error al hacer Update del comentario: ', err)
                alert('No se pudo actualizar el comentario.')
            })
            setEditando(!editando)
        } else {
            setEditando(true)
        }
        
    }


    return (
        <div className="bg-blueDashboard rounded-lg p-3 flex items-start flex-row w-full max-w-full">
            <div className="flex-1 min-w-0">
                <div className='flex flex-row items-center justify-between gap-3 mb-2'>
                    <div className='flex items-center gap-2 min-w-0'>
                        <User2 size={22} className='text-white shrink-0'/>
                        <h3 className="text-white font-bold text-lg md:text-xl truncate">{user.nombre}</h3>
                    </div>
                    {idUser == user.id && (
                        <div className='flex flex-row gap-3 shrink-0'>
                            <Edit2 className={`${editando? "text-blueBase" : "text-blueDark"}
                            hover:text-bluebase hover:scale-110 transition-all cursor-pointer`}
                            onClick={UpdateComentario}
                            size={25} md:size={10}/>
                            <Trash2 className="text-warning hover:text-warningDark hover:scale-110 transition-all cursor-pointer"
                            onClick={(e)=>{EliminarComentario(id, token); e.stopPropagation();}}
                            size={25} md:size={10}/> 
                        </div>
                    )}
                </div>
                {editando ? (
                    <textarea value={formData.texto}
                    name='texto'
                    onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 bg-blueBase text-BlueDarkDark font-semibold text-sm leading-tight placeholder-blueDark focus:outline-none min-h-20 resize-y">
                    </textarea>
                ) : (
                    <p className="w-full rounded-lg px-3 py-2 bg-blueBase text-BlueDarkDark font-semibold text-sm leading-tight wrap-break-words">
                        {text}
                    </p>
                )}
            </div>
        </div>
    )
}

export default ElementComentario