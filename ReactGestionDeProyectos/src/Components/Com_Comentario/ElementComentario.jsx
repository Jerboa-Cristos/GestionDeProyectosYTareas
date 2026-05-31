import { useState } from 'react'
import { updateComentario } from '../../services/comentarioService'
import { AlertDeleteComent } from '../../Components/Com_Comentario/AlertDeleteComent';
import { User2 } from "lucide-react"
import { toast } from 'react-hot-toast'


const ElementComentario = ({id, user, text, fecha, onDeleteSuccess, onUpdateSuccess}) => {
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

    const UpdateComentario = (e) => {
        e.stopPropagation()
        if(editando) {
            updateComentario(id, formData, token).then(res => {
                console.log('Comentario actualizado')
                onUpdateSuccess(id, formData.texto)
                toast.success('Comentario actualizado correctamente')
            }).catch(err=>{
                console.error('Error al hacer Update del comentario: ', err)
                toast.error('No se pudo actualizar el comentario.')
            })
            setEditando(!editando)
        } else {
            setEditando(true)
        }
        
    }


    return (
        <div className="p-3 flex items-start flex-row w-full max-w-full">
            <div className="flex-1 min-w-0">
                <div className='flex flex-row items-center justify-between gap-3 mb-2'>
                    <div className='flex items-center gap-2 min-w-0'>
                        <div title={user.email}>
                            <User2 size={22} className='text-white shrink-0'/>
                        </div>
                        <h3 className="text-white font-bold text-lg md:text-xl truncate">{user.nombre}</h3>
                        <span className="text-xs text-white/70">{new Date(fecha).toLocaleDateString()}</span>
                    </div>
                </div>
                {editando ? (
                    <textarea value={formData.texto}
                    name='texto'
                    onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 bg-blueBase text-BlueDarkDark font-semibold text-sm leading-tight placeholder-blueDark focus:outline-none min-h-10 resize-y">
                    </textarea>
                ) : (
                    <p className="w-full rounded-lg px-3 py-2 bg-blueBase text-BlueDarkDark font-semibold text-sm leading-tight wrap-break-words">
                        {text}
                    </p>
                )}
                {idUser == user.id && (
                    <div className='flex flex-row gap-3 shrink-0'>
                        <button className={`${editando? "text-BlueDarkDark" : "text-white/70"}
                        hover:text-blueDark transition-all cursor-pointer`}
                        onClick={UpdateComentario}>Editar</button>
                        <AlertDeleteComent id={id} token={token} onDeleteSuccess={onDeleteSuccess} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ElementComentario