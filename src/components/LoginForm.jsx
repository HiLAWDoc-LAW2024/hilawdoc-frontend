import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const moveToRegisterAccountPage = () => {
    navigate('/register');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='bg-white m-10 p-10 rounded-3xl border-2 border-gray-200'>
      <h1 className='text-5xl font-semibold px-10'>Welcome to HiLAWDoc</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='mt-8'>
            <label className='text-lg font-medium' htmlFor="username">Username</label>
            <input
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              type="text"
              name="username"
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
            />
          </div>
          <div className='mt-4'>
            <label className='text-lg font-medium' htmlFor="password">Password</label>
            <input
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              type="password"
              name="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
            />
          </div>
          <div className='mt-2 flex'>
            <p>Forgot password?</p>
            <button className='text-blue-500 text-base font-medium ml-1'>Click here</button>
          </div>
          <div className='mt-8 flex flex-col gap-y-4'>
            <button
              type='submit'
              className="active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div className='mt-8 flex justify-center items-center'>
          <p>Don't have account?</p>
          <button
            onClick={moveToRegisterAccountPage}
            className='text-blue-500 text-base font-medium ml-1'>
            Register now
          </button>
        </div>
      </div>
    </div>
  )
}