import './App.css'

import axios from 'axios';
import React from 'react';

import Base from './Components/Base';

function rutaApi(){
   return 'http://localhost:8000';
}

function App() {



  return (
    <div className="bg-blueDark h-screen w-screen">
      <Base/>
    </div>
  )
}

export default App
