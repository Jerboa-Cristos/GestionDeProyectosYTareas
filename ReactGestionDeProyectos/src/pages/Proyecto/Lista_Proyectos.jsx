import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import MenuTop from "../../Layout/Menu/MenuTop";
import MenuProductOwner from "../../Layout/Com_ProductOwner/MenuProductOwner";
import MenuProyecto from "../../Layout/Com_ProductOwner/MenuProyecto";
import { funcion_listado_proyecto, funcion_elimimar_proyecto } from "../../services/ruta_api_proyecto";

function Lista_Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("token existe", token);
    funcion_listado_proyecto(token)
      .then((res) => {setProyectos(res.data )
        console.log('lista p', res.data)
      })
      .catch((err) => console.error("Error cargando proyectos", err));

  }, []);
  
  const botonEliminarProyecto = (id_proyecto) => {
    const token = localStorage.getItem("token")
    const confirmar = window.confirm('Seguro quieres eliminar el proyecto?')

    if(!confirmar){
      return
    }

    funcion_elimimar_proyecto(id_proyecto, token)
    .then(() => {
      setProyectos(proyectosActuales => 
        proyectosActuales.filter(proyecto => proyecto.id !== id_proyecto)
      )
    })
    .catch(error => console.error('Error al eliminar el proyecto', error))
  } 
  console.log(proyectos);

  return (
    <div className="h-screen bg-blueDark p-4 flex flex-col">
      <MenuTop rutaPerfil='/product_owner_profile'/>
      <div className="flex flex-1 gap-4 overflow-hidden flex-col md:flex-row">
        <MenuProductOwner/>
          <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto pb-24">
            <div className=" flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-blueDark mb-6">Mis Proyectos</h1>
                <Link to="/crear_proyecto"
                  className="bg-blueBase hover:bg-turquesa hover:text-white transition px-4 py-2 rounded-lg font-semibold text-BlueDarkDark shadow text-center">
                  + Nuevo Proyecto
                </Link>
            </div>

            {proyectos.length === 0 ? (
              <p className="text-warning italic">No hay proyectos creados aún</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                  {proyectos.map((proyecto) => (
                    <MenuProyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                    botonEliminarProyecto={botonEliminarProyecto}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default Lista_Proyectos;