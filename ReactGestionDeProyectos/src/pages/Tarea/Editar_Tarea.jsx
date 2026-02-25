import { useEffect, useState } from "react"
import MenuTop from "../../Components/MenuTop"
import Menu_Izquierdo from "../Menus/Menu_Izquierdo"
import { Save } from "lucide-react"
import { funcion_actualizar_tarea, funcion_mostrar_tarea } from "../../services/ruta_api_tarea"
import { useParams, useNavigate } from "react-router-dom"
import { mostrarUsuarios } from "../../services/adminService"


function Editar_Tarea (){
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [tipo, setTipo] = useState('')
    const [estado, setEstado] = useState('')
    const [idDesarrollador, setIdDesarrollador] = useState('')
    const [desarrolladores, setDesarrolladores] = useState([])

    const {id_sprint, id_tarea } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        funcion_mostrar_tarea(id_sprint, id_tarea, token)
        .then(respuesta => {
            const tarea = respuesta.data
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setTipo(tarea.tipo)
            setEstado(tarea.estado)

        })
        .catch(error => console.log('Error al cargar la tarea', error))

        mostrarUsuarios(token)
            .then(respuesta => {
                const filtroUsuarios = respuesta.data.filter(
                    desarrollador => desarrollador.rol === 'Desarrollador'
                )

                setDesarrolladores(filtroUsuarios)

                console.log('Cargando desarrolador', respuesta.data)
            })

            .catch(error => {
                console.log('Error al mostrar desarrolladores', error.respuesta.data)
            })

    }, [id_sprint, id_tarea])


    const botonEditarTarea = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const data = {
            nombre, descripcion, tipo, estado, id_desarrollador: idDesarrollador
        }

        funcion_actualizar_tarea(id_sprint, id_tarea, data, token)
        .then(respuesta => {
            console.log('se ha actualizado la tarea', respuesta.data)
            navigate(`/tablero_kanban_product_owner/${id_sprint}`)
        })
        .catch(error => {
            console.log('Error al editar tarea', error)
        })
    }


    return(

        <>
        <MenuTop rutaPerfil='/product_owner_profile'/>  
    <div className="flex">
        <Menu_Izquierdo/>

        <div className="w-full p-6 min-h-screen">
            <div className="bg-white rounded-xl p-8 h-auto">

                <form onSubmit={botonEditarTarea}>
                    <div className="bg-blueDashboard rounded-lg p-6">
                        <h2 className="font-bold text-white mb-4 text-[1.2em]">Editar Tarea</h2>
                        
                        <label className="font-semibold text-white mt-4 block">Nombre</label>
                        <input
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        type="text" 
                        className="w-full rounded px-3 py-2 mt-1 bg-blueBase border border-BlueBaseDark"
                        required
                        placeholder="Escribe el nombre de la tarea aquí" 
                        />

                        <label className="font-semibold text-white mt-4 block">Descripción</label>
                        <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)} 
                        name="descripcion" 
                        placeholder="Escribe la descripcion"
                        className=" w-full rounded px-3 py-2 mt-1 h-24 bg-blueBase"
                        >
                        
                        </textarea>

                        <label className="block text-white font-semibold">Tipo</label>
                        <select  
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="rounded  bg-blueBase px-3 py-2 w-60 mt-1 text-BlueDarkDark">
                            <option value="Backend">Backend</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Diseño">Diseño</option>
                            <option value="Despliegue">Despliegue</option>
                            <option value="Testing">Testing</option>
                        </select>

                        <label className="block text-white font-semibold">Estado</label>
                        <select  
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="rounded  bg-blueBase px-3 py-2 w-60 mt-1 text-BlueDarkDark">
                            <option value="Por Hacer">Por Hacer</option>
                            <option value="En Curso">En Curso</option>
                            <option value="En Revision">En Revisión</option>
                            <option value="Finalizado">Finalizado</option>
                        </select>

                        <label className="font-semibold text-white mt-4 block">Asignar a un desarrollador</label>
                        <select
                        value={idDesarrollador}
                        onChange={(e) => setIdDesarrollador(e.target.value)}
                        required
                        className="rounded-lg px-4 py-2 bg-blueBase mt-1"
                        >
                            <option value={"Selecciona un desarrollador"}></option>
                            {desarrolladores.map(desarrollador => (
                                <option key={desarrollador.id} value={desarrollador.id}>
                                    {desarrollador.nombre}
                                    
                                </option>
                            ))}

                        </select>
                       


                        <div className="flex justify-end">
                        <button
                        className="bg-blueBase text-blueDark font-bold px-6 py-2 mt-6 rounded-lg hover:bg-GreenLite transition flex items-center gap-2"
                        >
                        <Save size={23} />
                        Guardar cambios
                        
                        </button>

                        </div>
                    </div>

                </form>   
            </div>
        </div>
    </div>
        
        
        </>
    )
}


export default Editar_Tarea