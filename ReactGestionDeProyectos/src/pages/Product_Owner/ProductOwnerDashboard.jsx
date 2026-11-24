//Code
import { useEffect, useState } from "react"
import { listadoTareasProductOwner } from "../../services/tareaService"
//Visual components
import MenuTop  from '../../Layout/Menu/MenuTop'
import MenuProductOwner from '../../Layout/Com_ProductOwner/MenuProductOwner'
import Loading from '../../Layout/Loading';
import { ClipboardList ,Calendar, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Legend } from 'recharts';


function ProductOwnerDashboard () {
    const token = localStorage.getItem('token')
    const [tareas, setTareas] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listadoTareasProductOwner( token)
        .then(res => {
            setTareas(res.data)
            setLoading(false)
        })
        .catch(error => {
            console.log('Error al cargar tareas', error)
        })
    }, [])

//#region FUNCIONES DEL DASHBOARD
    //#region FILTRO TAREAS POR ESTADO
    const tareasPorHacer = tareas.filter(tarea => tarea.estado === 'Por Hacer').length;
    const tareasEnCurso = tareas.filter(tarea => tarea.estado === 'En Curso').length;
    const tareasEnRevision = tareas.filter(tarea => tarea.estado === 'En Revision').length;
    const tareasFinalizada = tareas.filter(tarea => tarea.estado === 'Finalizado').length;
    //#endregion

    //#region TAREAS DEADLINE
    const tareasDeadline = tareas.filter(tarea => {
        const fechaFin = new Date(tarea.fecha_fin)
        const fechaActual = new Date()
        const diferenciaFecha = Math.abs((fechaFin - fechaActual) / 86400000);
        return diferenciaFecha > 0 && diferenciaFecha <= 4;
    })
    //#endregion


    //#region GRÁFICO CIRCULAR RESUMEN ESTADO
    const datosGrafico = [
        {label: "Por Hacer", value: tareasPorHacer, color: '#00b4d8'},
        {label: "En Curso", value: tareasEnCurso, color: '#0077b6'},
        {label: "En Revision", value: tareasEnRevision, color: '#ff9f1c'},
        {label: "Finalizado", value: tareasFinalizada, color: '#adb5bd'}
    ]

    const total = datosGrafico.reduce((acc, item) => acc + item.value, 0)

    const tipoDeTarea = {
        Backend: tareas.filter(tarea => tarea.tipo === 'Backend').length,
        Frontend: tareas.filter(tarea => tarea.tipo === 'Frontend').length,
        Diseño: tareas.filter(tarea => tarea.tipo === 'Diseño').length,
        Despliegue: tareas.filter(tarea => tarea.tipo === 'Despliegue').length,
        Testing: tareas.filter(tarea => tarea.tipo === 'Testing').length
    }
    
    const backend = tipoDeTarea.Backend;
    const frontend = tipoDeTarea.Frontend;
    const diseño = tipoDeTarea.Diseño;
    const despliegue = tipoDeTarea.Despliegue;
    const testing = tipoDeTarea.Testing;

    const totalTipoDeTarea = tareas.length > 0 ? tareas.length : 1

    const porcentajeBackend = (backend / totalTipoDeTarea) * 100
    const porcentajeFrontend = (frontend / totalTipoDeTarea) * 100
    const porcentajeDiseño = (diseño / totalTipoDeTarea) * 100
    const porcentajeDespliegue = (despliegue / totalTipoDeTarea) * 100
    const porcentajeTesting = (testing / totalTipoDeTarea) * 100
    //#endregion

//#endregion

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-blueDark p-2 md:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/product_owner_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 lg:pb-0">
                <MenuProductOwner/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 lg:p-8 overflow-y-auto flex flex-col gap-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-blueDark mb-2 lg:mb-6 text-center lg:text-left">Dashboard</h1>

                    {/* Grid Principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-5">
                        {/* Tarjetas de Tareas */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* Tareas Asignadas */}
                            <button 
                            className="bg-blueDashboard rounded-xl p-6 flex items-center justify-between text-white 
                            hover:shadow-lg hover:bg-blueblue transition-all">
                                <div className="flex items-center gap-4">
                                    <ClipboardList className="w-12 h-12 md:w-20 md:h-20" />
                                    <span className="text-xl font-semibold leading-tight">Tareas </span>
                                </div>
                                <span className="text-4xl font-bold">{tareas.length}</span>
                            </button>
                            {/* Tareas Deadline */}
                            <button  
                            className={"bg-warning rounded-xl p-6 flex items-center justify-between text-white relative hover:shadow-lg hover:bg-warningDark transition-all"}>
                            <div className="flex items-center gap-4">
                                <Calendar className="w-10 h-10 md:w-16 md:h-16" />
                                <span className="text-xl font-semibold leading-tight">Tareas Deadline</span>
                            </div>
                            <span className="text-4xl font-bold mr-4">{tareasDeadline.length}</span>
                            <AlertCircle className="absolute bottom-4 right-4 text-warningDark bg-white rounded-full" size={30} />
                            </button>
                        </div>

                        {/* Tipo de Trabajo MONTARLO TODO */}
                        <div className="bg-blueBase rounded-xl p-6">
                            <h3 className="text-center text-xl font-semibold text-blueDark mb-4">Tipo de trabajo</h3>
                            <div className="space-y-1">
                                <div>
                                    <p className="text-sm text-blueDark mb-1">Backend - {backend} tareas</p>
                                    <div className="w-full bg-transparent h-6">
                                        <div className="bg-blueBase h-full" style={{width:`${porcentajeBackend}`}}></div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-blueDark mb-1">Frontend - {frontend} tareas</p>
                                    <div className="w-full bg-transparent h-6">
                                        <div className="bg-blueBase h-full" style={{width:`${porcentajeFrontend}`}}></div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-blueDark mb-1">Diseño - {diseño} tareas</p>
                                    <div className="w-full bg-transparent h-6">
                                        <div className="bg-blueBase h-full" style={{width:`${porcentajeDiseño}`}}></div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-blueDark mb-1">Despliegue - {despliegue} tareas</p>
                                    <div className="w-full bg-transparent h-6">
                                        <div className="bg-blueBase h-full" style={{width:`${porcentajeDespliegue}`}}></div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-blueDark mb-1">Testing - {testing} tareas</p>
                                    <div className="w-full bg-transparent h-6">
                                        <div className="bg-blueBase h-full" style={{width:`${porcentajeTesting}`}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                       {/* Últimos Cambios */}
                        <div className="bg-blueBase rounded-xl p-6 shadow-sm">
                            <h3 className="text-center text-xl font-semibold text-blueDark mb-6">Últimos Cambios</h3>
                            <div className="space-y-3">
                            {tareas.slice(0, 3).map((tarea) => (
                                <div key={tarea.id} className="bg-turquesa rounded-lg p-3 flex items-center gap-4 text-white text-sm">
                                
                                    <div className="grid grid-cols-2 sm:grid-cols-4 w-full text-center text-xs sm:text-sm">
                                        <span>{tarea.nombre}</span>
                                        <span>{tarea.tipo}</span>
                                        <span>{tarea.estado}</span>
                                        <span>{tarea.fecha_fin}</span>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Resumen del Estado (Gráfico Circular) */}
                        <div className="bg-blueBase rounded-xl p-4 lg:p-6 shadow-sm flex flex-col items-center">
                            <h3 className="text-lg lg:text-xl font-semibold text-blueDark mb-6">Resumen del Estado</h3>
                            <div className="w-full h-64 max-w-xs">
                            
                                <svg width={220} height={220} viewBox="0 0 32 32">
                                {(() => {
                                    let acumulado = 0
                                    const radio = 16
                                    const centro = 16

                                    return datosGrafico.map((item, index) => {
                                        const porcentaje = total == 0 ? 0 : item.value / total
                                        const anguloInicio = acumulado * 2 * Math.PI
                                        const anguloFin = (acumulado + porcentaje) * 2 * Math.PI
                                        acumulado += porcentaje

                                        const x1 = centro + radio * Math.cos(anguloInicio)
                                        const y1 = centro + radio * Math.sin(anguloInicio)
                                        const x2 = centro + radio * Math.cos(anguloFin)
                                        const y2 = centro + radio * Math.sin(anguloFin)

                                        const arcoGrande = porcentaje > 0.5 ? 1 : 0

                                        const path = `
                                        M${centro} ${centro} 
                                        L${x1} ${y1}
                                        A${radio} ${radio} 0 ${arcoGrande} 1 ${x2} ${y2}
                                        Z`

                                        return (
                                            <path 
                                            key={index}
                                            d={path}
                                            fill={item.color}
                                            stroke="white"
                                            strokeWidth="0.2"
                                            ></path>
                                        )

                                    })
                                })()}
                                </svg>

                                <div className="mt-6 text-blueDark text-sm font-semibold space-y-2 pb-5">
                                    {datosGrafico.map((item, i) => (
                                        <div
                                        key={i}
                                        className="flex items-center gap-2" >
                                            <div className="w-3 h-3 rounded-full" style={{background: item.color}}></div>
                                            {item.label}: {item.value}

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </main>
            </div>
        </div>    
    )
}

export default ProductOwnerDashboard