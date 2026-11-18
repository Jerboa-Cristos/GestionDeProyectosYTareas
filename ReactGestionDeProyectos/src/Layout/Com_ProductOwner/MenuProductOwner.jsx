import {Home, FolderKanban, NotebookPen} from 'lucide-react'
import SideMenu from '../Menu/SideMenu'

function getRutaKanban() {
    const proyecto_activo = localStorage.getItem("proyecto_activo")
    const sprint_activo = localStorage.getItem("sprint_activo")
    let rutaKanban = "/lista_proyectos"
    if(sprint_activo){
        rutaKanban = `/tablero_kanban_product_owner/${sprint_activo}`
    }else if(proyecto_activo){
        rutaKanban = `/lista_sprint/${proyecto_activo}`
    }
    return rutaKanban
}

const itemsMenuProductOwner = [
    { index: 0, icono: Home, texto: "Panel", ruta: "/product_owner_dashboard" },
    { index: 1, icono: FolderKanban, texto: "Proyectos", ruta: "/lista_proyectos" },
    { index: 2, icono: NotebookPen, texto: "Tablero Kanban", ruta: getRutaKanban() }
]

function MenuProductOwner() {
    return <SideMenu items={itemsMenuProductOwner} />
}

export default MenuProductOwner