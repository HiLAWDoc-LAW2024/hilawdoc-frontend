import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        handleLogout();
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="">
      <button
        onClick={handleLogout}
        className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold m-4 py-2 px-4 rounded">
        Logout
      </button>
      <div className='h-screen flex justify-center items-center'>
        <h1>This is home page</h1>
      </div>
    </div>
  );
}

export default HomePage;
