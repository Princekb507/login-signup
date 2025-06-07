import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // redirect to login if not logged in
    }
  }, [navigate]);

  return (
    <div className='home-container'>
      <h1>Hello, welcome to the Home Page!</h1>
      <Logout />
    </div>
  );
}

export default Home;
