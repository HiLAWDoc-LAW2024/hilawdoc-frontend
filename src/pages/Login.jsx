import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center'>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
