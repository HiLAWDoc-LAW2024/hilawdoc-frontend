import React from 'react';
import RegisterAccountForm from '../components/RegisterAccountForm';

function RegisterAccountPage() {
  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center'>
        <RegisterAccountForm />
      </div>
    </div>
  );
}

export default RegisterAccountPage;