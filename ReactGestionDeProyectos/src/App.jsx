import './App.css'

import axios from 'axios';
import React from 'react';

import Base from './Components/Base';

//melissa
import {Routes, Route, Navigate} from 'react-router-dom';
import Register from './pages/Register/Register';

function rutaApi(){
   return 'http://localhost:8000';
}

function App() {



  return (

    {/*
      <div className="bg-blueDark h-screen w-screen">
      <Base/>
    </div>
      */},

      <>
        <Routes>
          <Route path='/' element={<Navigate to='/register' />}></Route>
          
          <Route 
          path="/base" 
          element={
            <>
              <div className="bg-blueDark h-screen w-screen"></div>
              <Base />
            </>
          }
          />

          <Route path="/register" element={<Register/>}/> 

        </Routes>
      
      
      </>
    

    
  )
}

export default App
