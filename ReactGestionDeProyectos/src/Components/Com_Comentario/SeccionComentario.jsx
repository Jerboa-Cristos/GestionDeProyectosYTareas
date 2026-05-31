import {useState, useEffect} from 'react'
import { mostrarComentarios, guardarComentario } from '../../services/comentarioService'
import { Send } from "lucide-react"
import ElementComentario from './ElementComentario'
import { toast } from 'react-hot-toast'

const SeccionComentario = ({idTarea}) => {
    const token = localStorage.getItem('token');
    const [comentarios, setComentarios] = useState([])
    const [escribiendo, setEscribiendo] = useState(false)

    useEffect(() => {
        if(idTarea && token) {
            mostrarComentarios(idTarea, token).then(res=> {
                setComentarios(res.data);
            }).catch(err=>{
                console.error('Error al cargar los comentarios: ', err)
                toast.error('No se pudieron cargar los comentarios.')
            });
        }
    }, [idTarea, token])

    const comEliminado = (idEliminado) => {
        setComentarios(prev => prev.filter(c=> c.id !== idEliminado))
    }

    const comActualizado = (idActualizado, nuevoTexto) => {
        setComentarios(prev => prev.map(c => c.id === idActualizado ? {...c, texto: nuevoTexto} : c))
    }

//#region Cosas del form
    const [formData, setFormData] = useState({
        id_tarea: idTarea,
        texto: '', 
    })

    const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    })}
    

    const GuardarComentario = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        guardarComentario(formData, token).then(res => {
            const newComentario = res.data
            console.log(newComentario)
            setComentarios(prevComentarios => [...prevComentarios, newComentario]);
            setFormData({...formData, texto:''})
            setEscribiendo(false)
            toast.success('Comentario guardado correctamente')
        }).catch(err => {
            console.error('No se pudo guardar el comentario', err)
            toast.error('No se pudo guardar el comentario.')
        })
    }
//#endregion


    return (
        <div>
            <div className="mb-4 ">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">Comentarios</h2>
            </div>
            <div className=" rounded-lg h-auto">
                <form onSubmit={GuardarComentario} className='flex flex-col gap-2 item-center'>
                    <textarea name='texto'
                    value={formData.texto}
                    onChange={handleChange}
                    onFocus={()=>setEscribiendo(true)}
                    onBlur={()=>{if(formData.texto.trim() === '') setEscribiendo(false)}}
                    className="w-full bg-white rounded-xl p-4 font-semibold text-blueDark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-25 resize-none" placeholder='Añadir comentario'>
                    </textarea>
                    {escribiendo ? (
                        <div className="flex justify-start">
                        <button type='submit' className="bg-blueBase text-blueDark font-bold px-2 py-2 rounded-lg hover:bg-GreenLite transition flex items-center">
                            <Send size={20}/>
                            <span>Enviar</span>
                        </button>
                        </div>) : null
                    }
                </form>
            </div>
            <div className="mt-6">
                {comentarios.map(comentario => (
                    <ElementComentario key={comentario.id} id={comentario.id} user={comentario.autor} text={comentario.texto} fecha={comentario.updated_at} onDeleteSuccess={comEliminado} onUpdateSuccess={comActualizado}/>
                ))}
            </div>
        </div>
    )
}

export default SeccionComentario