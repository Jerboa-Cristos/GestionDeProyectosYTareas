import { Home, CheckSquare2, NotebookPen} from 'lucide-react';
import SideMenu from '../Menu/SideMenu'

const itemsMenuDesarrollador = [
        { index: 0, icono: Home, texto: "Panel", ruta: "/DashboardDesarrollador" },
        { index: 1, icono: CheckSquare2, texto: "Tablero Kanban", ruta: "/TableroKanbanDesarrollador" },
        { index: 2, icono: NotebookPen, texto: "Mis Tareas", ruta: "/MisTareasDesarrollador" }
]

function MenuDesarrollador() {

    return <SideMenu items={itemsMenuDesarrollador} />
}

export default MenuDesarrollador