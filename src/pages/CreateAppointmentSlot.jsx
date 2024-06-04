import React from 'react';
import CreateAppointmentSlotForm from '../components/CreateAppointmentSlotForm';

function CreateAppointmentSlotPage() {
  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center'>
        <CreateAppointmentSlotForm />
      </div>
    </div>
  );
}

export default CreateAppointmentSlotPage;