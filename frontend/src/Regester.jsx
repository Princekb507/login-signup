import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Regester.css';

function Regester() {
    function switchContent(){
      const content=document.getElementById("content");
      const RegesterBtn=document.getElementById("regester")
      const loginBtn=document.getElementById("login")

      RegesterBtn.addEventListener('click',()=>{
        content.classList.add("active")
      });
      loginBtn.addEventListener("click",()=>{
        content.classList.remove("active")
      })
    }


    // ************************Regester***********************

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate=useNavigate()

  function regester(event){
    event.preventDefault();
    axios.post("http://localhost:5174/regester",{username,email,password})
    
    .then(response=>{
      console.log("Registered successfully", response.data);
      navigate("/home")
    }).catch(err=>console.log(err))
  }

    
  return (
    <div className="all"  id='content'>
      <div className='' >
      <form  onSubmit={regester}>
        <div className=''> 
              <h1>create account</h1>
        </div>
        <div className=''>
          <input type="text" placeholder='Name'className=' ' value={username} onChange={(e=> setUsername(e.target.value))} required/>
        </div>
        <div className=''>
          <input type="email" placeholder='Email'className=''  value={email} onChange={(e=> setEmail(e.target.value))} required/>
        </div>
        <div className=''>
          <input type="password" placeholder='Password'className=' ' value={password} onChange={(e=> setPassword(e.target.value))} required/>
        </div>
        <div className=''>
          <button type="submit" className=''>Regester</button>
        </div>
      </form>
      </div>
      
    </div>
  )
}

export default Regester
