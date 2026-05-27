import {useState, useEffect} from 'react'
import { mostrarComentarios, guardarComentario } from '../../services/comentarioService'
import { Send } from "lucide-react"
import ElementComentario from './ElementComentario'

const SeccionComentario = ({idTarea}) => {
    const token = localStorage.getItem('token');
    const [comentarios, setComentarios] = useState([])

    useEffect(() => {
        if(idTarea && token) {
            mostrarComentarios(idTarea, token).then(res=> {
                setComentarios(res.data);
            }).catch(err=>{
                console.error('Error al cargar los comentarios: ', err)
                alert('No se pudieron cargar los comentarios.')
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
        }).catch(err => {
            console.error('No se pudo guardar el comentario', err)
            alert('No se pudo guardar el comentario.')
        })
    }
//#endregion


    return (
        <div className="bg-blueDashboard rounded-xl p-2 md:p-8 flex flex-col h-full shadow-inner shrink-0">
            <div className="mb-4 ">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">Comentarios</h2>
            </div>
            <div>
                {comentarios.map(comentario => (
                    <ElementComentario key={comentario.id} id={comentario.id} user={comentario.autor} text={comentario.texto} onDeleteSuccess={comEliminado} onUpdateSuccess={comActualizado}/>
                ))}
            </div>
            <div className="bg-blueDashboard rounded-lg h-auto">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Añadir comentario</h3>
                </div>
                <form onSubmit={GuardarComentario} className='flex flex-row gap-4 item-center'>
                    <textarea name='texto'
                    value={formData.texto}
                    onChange={handleChange}
                    className="w-full bg-white rounded-xl p-4 font-semibold text-blueDark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-25 resize-none" placeholder='Añadir comentario'>
                    </textarea>
                    <div className="flex justify-end mt-3">
                    <button type='submit' className="bg-blueBase text-blueDark font-bold px-2 py-2 md:px-4 md:py-6 mt-6 md:mt-6 rounded-lg hover:bg-GreenLite transition flex items-center gap-2">
                        <Send size={20}/>
                        <span>Enviar</span>
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SeccionComentario