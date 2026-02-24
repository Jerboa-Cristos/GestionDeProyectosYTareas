import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuTop from "../../Components/MenuTop";
import { funcion_listado_proyecto, funcion_elimimar_proyecto } from "../../services/ruta_api_proyecto";
import Menu_Izquierdo from "../Menus/Menu_Izquierdo";

function Lista_Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const {id_proyecto} = useParams()

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
    <>
      <MenuTop rutaPerfil='/product_owner_profile'/>

      <div className="flex min-h-screen">
        <div className="hidden md:block w-56">
        <Menu_Izquierdo />
        </div>

          <div className="flex-1 p-4 sm:p-6">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl sm-text-3xl text-blueDark">
                  Mis Proyectos
                </h1>

                <Link
                  to="/crear_proyecto"
                  className="bg-blueBase hover:bg-blue-300 transition px-4 py-2 rounded-lg font-semibold text-BlueDarkDark shadow text-center"
                >
                  + Nuevo Proyecto
                </Link>
              </div>

              {proyectos.length === 0 ? (
                <p className="text-warning italic">No hay proyectos creados aún</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {proyectos.map((proyecto) => (
                      <div
                        key={proyecto.id}
                        className=" bg-blueblue rounded-xl p-5 shadow hover:shadow-md hover:-translate-y-1 transition"
                      >
                        <h2 className="font-bold text-white text-xl mb-2">
                          {proyecto.nombre}
                        </h2>

                        <p className="text-white text-sm mb-4 line-clamp-3">
                          {proyecto.descripcion}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">

                        <Link to={`/mostrar_proyecto/${proyecto.id}`}>
                          <button className="w-full bg-white text-BlueDarkDark font-semibold px-3 py-2 rounded-md shadow hover:bg-GreenLite transition">Ver Proyecto</button>


                        </Link>

                        <button onClick={() => botonEliminarProyecto(proyecto.id)} 
                        className="bg-red-600 text-white font-semibold px-3 py-2 rounded-md shadow hover:bg-red-400 transition sm:w-auto">
                          Eliminar
                        </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
      </div>
    </>
  )
}

export default Lista_Proyectos;
