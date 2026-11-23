import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Save } from "lucide-react"
import MenuTop from "../../Layout/Menu/MenuTop"
import MenuProductOwner from "../../Layout/Com_ProductOwner/MenuProductOwner"
import { indexDesarrolladores , crearTarea } from "../../services/tareaService"

function Crear_Tarea () {
    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [estado, setEstado] = useState('Por Hacer')
    const [descripcion, setDescripcion] = useState('')
    const [desarrolladores, setDesarrolladores] = useState([])
    const [idDesarrollador, setIdDesarrollador] = useState('')
    const [fechaFin, setFechaFin] = useState('')

    const {id_sprint} = useParams()

    const navigate = useNavigate()


    const botonGuardarTarea = (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        const data = {
            nombre, 
            tipo,
            estado: "Por Hacer",
            descripcion: descripcion, 
            fecha_fin: fechaFin,
            id_sprint: id_sprint,
            id_desarrollador: idDesarrollador

        }
        crearTarea(data, id_sprint, token)
        .then(respuesta => {
            console.log('tarea creada', respuesta.data)
            navigate(`/tablero_kanban_product_owner/${id_sprint}`)
            console.log('ID sprint recibido',id_sprint)
            
        })
        .catch(error => {
            console.log('Error al crear tarea', error.respuesta.data)
        })

    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        indexDesarrolladores(token)
        .then(respuesta => {
            setDesarrolladores(respuesta.data)
            console.log('Cargando desarrolador', respuesta.data)
        }).catch(error => {
            console.log('Error al mostrar desarrolladores', error.respuesta.data)
        })
    }, [])
    

    return (
    <div className="min-h-screen bg-blueDark p-2 lg:p-4 flex flex-col font-sans">
        <MenuTop rutaPerfil='/product_owner_profile'/>  
        <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 lg:pb-0">
            <MenuProductOwner/>
            <main className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
                <div className="flex-1 bg-blueDashboard rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
                    <form onSubmit={botonGuardarTarea} className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-4 text-center lg:text-left">Crear Tarea</h1>
                                
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Nombre</label>
                            <input
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)}
                            type="text" 
                            className="rounded-md w-full mt-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"
                            required
                            placeholder="Escribe el nombre de la tarea aquí" 
                            />

                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Descripción</label>
                            <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} 
                            name="descripcion" 
                            placeholder="Escribe la descripcion"
                            className="rounded-md w-full mt-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none">
                            </textarea>

                            <div className="grid grid-cols-2 gap-2">
                                <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Tipo de tarea</label>
                                <select 
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                className="rounded-md w-full p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none">
                                    <option value={"Backend"}>Backend</option>
                                    <option value={"Frontend"}>Frontend</option>
                                    <option value={"Diseño"}>Diseño</option>
                                    <option value={"Despliegue"}>Despliegue</option>
                                    <option value={"Testing"}>Testing</option>
                                </select>
                            
                                <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Asignar a un desarrollador</label>
                                <select
                                value={idDesarrollador}
                                onChange={(e) => setIdDesarrollador(e.target.value)}
                                required
                                className="rounded-md w-full p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none">
                                    <option value={"Selecciona un desarrollador"}></option>
                                    {desarrolladores.map(desarrollador => (
                                        <option key={desarrollador.id} value={desarrollador.id}>
                                            {desarrollador.nombre}
                                            
                                        </option>
                                    ))}
                                </select>

                                <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Fecha limite</label>
                                <input 
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                type="date" 
                                name="fecha_fin"  
                                className="rounded-md w-full p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"/>
                            </div>

                            <div className="flex justify-end">
                            <button
                            className="w-full lg:w-auto bg-blueBase text-blueDark font-bold px-4 py-3 rounded-xl hover:bg-turquesa 
                                        hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                                <Save size={20}/>Guardar</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </div>
    )
}

export default Crear_Tarea