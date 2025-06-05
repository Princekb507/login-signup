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
      <Route path="/Regester" element={<Regester/>} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<Login/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
