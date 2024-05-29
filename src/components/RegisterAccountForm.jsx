import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password || !email || !fullname) {
      setError('Please fill all fields');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Password does not match');
      return false;
    }
    setError('');
    return true;
  };

  const moveToLoginPage = () => {
    navigate('/login');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formDetails = {
      username,
      password,
      email,
      full_name: fullname
    };

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDetails),
      });

      if (response.ok) {
        const data = await response.json();
        moveToLoginPage();
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Registration failed!');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='bg-white m-10 px-10 py-5 rounded-3xl border-2 border-gray-200'>
      <h1 className='text-4xl text-center font-semibold'>Register Account</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='mt-8'>
            <label className='text-base font-medium' htmlFor="username">Username</label>
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
          <div className='mt-4 flex gap-x-4'>
            <div className='w-1/2'>
              <label className='text-base font-medium' htmlFor="password">Password</label>
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
            <div className='w-1/2'>
              <label className='text-base font-medium' htmlFor="confirmPassword">Confirm Password</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                type="password"
                name="confirmPassword"
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm your password'
              />
            </div>
          </div>
          <div className='mt-4'>
            <label className='text-base font-medium' htmlFor="email">Email</label>
            <input
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              type="email"
              name="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
            />
          </div>
          <div className='mt-4'>
            <label className='text-base font-medium' htmlFor="fullname">Full Name</label>
            <input
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              type="fullname"
              name="fullname"
              id='fullname'
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder='Enter your full name'
            />
          </div>
          <div className='mt-8 flex flex-col gap-y-4'>
            <button
              type='submit'
              className="active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Account
            </button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div className='mt-8 flex justify-center items-center'>
          <p>Already have account?</p>
          <button
            onClick={moveToLoginPage}
            className='text-blue-500 text-base font-medium ml-1'>
            Sign in now
          </button>
        </div>
      </div>
    </div>
  )
}