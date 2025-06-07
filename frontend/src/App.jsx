import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Regester from "./Regester"
import Home from "./Home"
import Login from './Login';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Regester/>} />
      <Route path="/regester" element={<Regester/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
