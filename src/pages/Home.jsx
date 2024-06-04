import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import HomeUser from '../components/HomeUser';
import HomeDoctor from '../components/HomeDoctor';

function HomePage() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);
        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.log('error: ' + error);
        handleLogout();
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (role === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <button
        onClick={handleLogout}
        className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold m-4 py-2 px-4 rounded">
        Logout
      </button>
      <div className='h-screen flex justify-center items-center'>
        {role === 'user' ? <HomeUser /> : role === 'doctor' ? <HomeDoctor /> : <p>Invalid role</p>}
      </div>
    </div>
  );
}

export default HomePage;
