import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuTop from "../../Components/MenuTop";
import { funcion_listado_proyecto, funcion_elimimar_proyecto } from "../../services/ruta_api_proyecto";
import Menu_Izquierdo from "../Menus/Menu_Izquierdo";

function Lista_Proyectos() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token existe", token);
    funcion_listado_proyecto(token)
      .then((res) => setProyectos(res.data))
      .catch((err) => console.error("Error cargando proyectos", err));

    
  }, []);

  console.log(proyectos);

  return (
    <>
      <MenuTop />

      <div className="flex">
        <div className="w-56">
        <Menu_Izquierdo />
        </div>

          <div className="flex-1 p-6">
            <div className="bg-white rounded-xl shadow-sm p-6 ml-3 mt-0.5">

              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blueDark">
                  Mis Proyectos
                </h1>

                <Link
                  to="/crear_proyecto"
                  className="bg-blueBase hover:bg-blue-300 transition px-4 py-2 rounded-lg font-semibold text-BlueDarkDark shadow"
                >
                  + Nuevo Proyecto
                </Link>
              </div>

              {proyectos.length === 0 ? (
                <p className="text-warning italic">No hay proyectos creados aún</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {proyectos.map((proyecto) => (
                      <div
                        key={proyecto.id}
                        className=" bg-blueblue
                         rounded-xl p-5 shadow hover:shadow-md hover:-translate-y-1 transition"
                      >
                        <h2 className="font-bold text-white text-xl mb-2">
                          {proyecto.nombre}
                        </h2>

                        <p className="text-white text-sm mb-4 line-clamp-3">
                          {proyecto.descripcion}
                        </p>

                        <Link to={`/mostrar_proyecto/${proyecto.id}`}>
                          <button className="bg-white text-BlueDarkDark font-semibold px-3 py-2 rounded-md shadow hover:bg-gray-100 trnasition">Ver Proyecto</button>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
      </div>
    </>
  );
}

export default Lista_Proyectos;
