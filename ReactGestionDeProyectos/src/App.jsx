import './App.css'
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/login';
import DashboardAdmin from './pages/Administrador/dashboardAdmin';
import GestionUsuarios from './pages/Administrador/gestionUsuarios';
import PerfilUsuario from './pages/PerfilUsuario';
import CreacionUsuarios from './pages/Administrador/CreacionUsuarios';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/DashboardAdmin" element={<DashboardAdmin/>}/>
          <Route path="/GestionUsuarios" element={<GestionUsuarios/>}/>
          <Route path="/PerfilUsuario" element={<PerfilUsuario/>}/>
          <Route path="/CreacionUsuarios" element={<CreacionUsuarios/>}/>
        </Routes>
      </Router>
  )
}

export default App
