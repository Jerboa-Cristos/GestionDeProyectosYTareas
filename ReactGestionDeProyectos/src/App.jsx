import './App.css'
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/login';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/DashboardAdmin" element={<dashboardAdmin/>}/>
        </Routes>
      </Router>
  )
}

export default App
