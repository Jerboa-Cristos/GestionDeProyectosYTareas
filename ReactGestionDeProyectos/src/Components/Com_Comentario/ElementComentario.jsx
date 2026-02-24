import { useState } from 'react'
import {eliminarComentario, updateComentario} from '../../services/comentarioService'
import { User2, Trash2, Edit2 } from "lucide-react"


const ElementComentario = ({id, user, text, onDeleteSuccess}) => {
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
            }).catch(err=>{
                console.error('Error al hacer Update del comentario: ', err)
            })
            setEditando(!editando)
        } else {
            setEditando(true)
        }
        
    }


    return (
        <div className="bg-blueDashboard rounded-lg p-1 flex gap-2 items-start flex-row">
            <div className="flex-1">
                <div className='flex flex-row gap-3'>
                    <User2 size={22} className='text-white text-bold rounded-full mt-1'/>
                    <h3 className="text-white font-bold text-xl">{user.nombre}</h3>
                    {idUser == user.id && (
                        <div className='flex flex-row gap-2'>
                            <Edit2 className={`${editando? "text-blueBase" : "text-blueDark"}
                            hover:text-bluebase hover:scale-110 transition-all cursor-pointer xs:size-7`}
                            onClick={UpdateComentario}
                            size={10}/>
                            <Trash2 className="text-warning hover:text-warningDark hover:scale-110 transition-all cursor-pointer xs:size-7"
                            onClick={(e)=>{EliminarComentario(id, token); e.stopPropagation();}}
                            size={10}/> 
                        </div>
                    )}
                </div>
                {editando ? (
                    <textarea value={formData.texto}
                    name='texto'
                    onChange={handleChange}
                    className="w-80 rounded-lg px-3 py-2 mt-1 bg-blueBase text-BlueDarkDark font-semibold text-sm leading-tight placeholder-blueDark">
                    </textarea>
                ) : (
                    <p className="w-80 rounded-lg px-3 py-2 mt-1 bg-blueBase text-BlueDarkDark font-semibold text-sm leading-tight">
                        {text}
                    </p>
                )}
            </div>
        </div>
    )
}

export default ElementComentario