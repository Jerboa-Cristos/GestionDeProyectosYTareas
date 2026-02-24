import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import MenuTop from "../../Components/MenuTop"
import Menu_Izquierdo from "../Menus/Menu_Izquierdo"
import { funcion_listado_sprint } from "../../services/ruta_api_sprint"

function Lista_Sprints () {
    const [sprints, setSprints] = useState([])
    const {id_proyecto} = useParams()

    localStorage.setItem("sprint_activo", sprints.id)

    const seleccionarSprint = (id) => {
        localStorage.setItem('sprint_activo', id)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        funcion_listado_sprint(id_proyecto, token)
        .then(respuesta =>  {
            console.log('Sprints cargados: ' , respuesta.data)
            setSprints(respuesta.data)

            console.log('ID PROYECTTO RECIBIDO', id_proyecto)

        })
        .catch(error => {
                
            console.log('Error cargando los sprints', error)
        })

    }, [id_proyecto])

    
        
    return(
        <>
        
        <MenuTop/>
        
            <div className="flex">
                <div className="w-56">
                <Menu_Izquierdo id_proyecto={id_proyecto}/>

                </div>

                <main className="flex-1 p-6">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h1 className="text-3xl font-bold text-blueDark mb-6">Selecciona un Sprint</h1>

                        {sprints.length === 0 ? (<p>No hay sprints creados aún</p>) : 
                        (
                        <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-3 gap-6">
                            {sprints.map(sprint => 
                                <div
                                key={sprint.id}
                                className="bg-blueDashboard rounded-xl p-5 shadow-sm hover:shadow-md transition"
                                >

                                    <p className="text-xl font-bold text-white mb-2">{sprint.nombre}</p>
                                    <p className="text-xm text-white mb-2">{sprint.meta_sprint}</p>

                                    <Link to={`/tablero_kanban_product_owner/${sprint.id}`}
                                    onClick={() => seleccionarSprint(sprint.id)}
                                    className="inline-block bg-blueBase hover:bg-BlueBaseDark text-BlueDarkDark font-semibold px-4 py-2 rounded-md shadow transition"
                                    >

                                        Abrir Sprint
                                    
                                    
                                    </Link>
                                    
                                </div>
                            )}
                            
                        </div>

                        )}


                    </div>
                </main>
            </div>
        
        
        </>
    )
}

export default Lista_Sprints