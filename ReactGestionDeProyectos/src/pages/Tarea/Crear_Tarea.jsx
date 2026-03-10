 import { Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MenuTop from "../../Components/MenuTop"
import { mostrarUsuarios } from "../../services/adminService"
import { funcion_crear_tarea } from "../../services/ruta_api_tarea"
import Menu_Izquierdo from "../Menus/Menu_Izquierdo"

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
                estado: estado || "Por Hacer",
                descripcion: descripcion, 
                fecha_fin: fechaFin,
                id_sprint: id_sprint,
                id_desarrollador: idDesarrollador

            }
            funcion_crear_tarea(data, id_sprint, token)
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
        }, [])
    

    return (
    <>  

    <div className="h-screen bg-blueDark p-4 flex flex-col">
    <MenuTop rutaPerfil='/product_owner_profile'/>  

    <div className="flex flex-1 gap-4 overflow-hidden flex-col md:flex-row">
        <div className="md:h-full md:flex">
            <Menu_Izquierdo/>

        </div>

        <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto pb-24">
            

                <form onSubmit={botonGuardarTarea}>
                    <div className="bg-blueDashboard rounded-lg p-6">
                        <h2 className="font-bold text-white mb-4 text-[1.2em]">Crear Tarea</h2>
                        
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

                        <label className="font-semibold text-white mt-4 block">Tipo de tarea</label>
                        <select 
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="max-w-xs w-full h-10 rounded px-3 bg-blueBase text-BlueDarkDark mt-1 font-semibold">
                            
                            <option value={"Backend"}>Backend</option>
                            <option value={"Frontend"}>Frontend</option>
                            <option value={"Diseño"}>Diseño</option>
                            <option value={"Despliegue"}>Despliegue</option>
                            <option value={"Testing"}>Testing</option>

                        </select>

                        <label className="font-semibold text-white mt-4 block">Estado de tarea</label>
                        <select 
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="max-w-xs w-full h-10 rounded px-3 bg-blueBase text-BlueDarkDark mt-1 font-semibold">
                            
                            <option value={"Por Hacer"}>Por Hacer</option>
                            <option value={"En Curso"}>En Curso</option>
                            <option value={"En Revisión"}>En Revisión</option>
                            <option value={"Finalizada"}>Finalizada</option>

                        </select>
                    
                        <label className="font-semibold text-white mt-4 block">Asignar a un desarrollador</label>
                        <select
                        value={idDesarrollador}
                        onChange={(e) => setIdDesarrollador(e.target.value)}
                        required
                        className="max-w-xs w-full h-10 rounded px-3 bg-blueBase text-BlueDarkDark mt-1"
                        >
                            <option value={"Selecciona un desarrollador"}></option>
                            {desarrolladores.map(desarrollador => (
                                <option key={desarrollador.id} value={desarrollador.id}>
                                    {desarrollador.nombre}
                                    
                                </option>
                            ))}

                        </select>

                        <label className="font-semibold text-white mt-4 block">Fecha limite</label>
                        <input 
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        type="date" 
                        name="fecha_fin"  
                        className="rounded-lg px-4 py-2 bg-blueBase mt-1 text-blueDark"/>


                        <div className="flex justify-end">
                        <button
                        className="bg-blueBase text-blueDark font-bold px-6 py-2 mt-6 rounded-lg hover:bg-GreenLite transition flex items-center gap-2"
                        >
                        <Save size={23} />
                        Guardar
                        
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

export default Crear_Tarea

























