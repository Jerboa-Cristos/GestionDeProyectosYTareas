import './App.css'
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/login';
import DashboardAdmin from './pages/Administrador/dashboardAdmin';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/DashboardAdmin" element={<DashboardAdmin/>}/>
        </Routes>
      </Router>
  )
}

export default App
