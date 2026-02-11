import './App.css'
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/login';
import Base from './Components/Base';

function App() {

  return (
    <main>
      <div className="bg-blueDark h-screen w-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
          </Routes>
        </Router>
      </div>
    </main>

  )
}

export default App
