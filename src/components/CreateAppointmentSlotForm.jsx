import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAppointmentSlotForm() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if (!date || !startTime || !endTime) {
      setError('Please fill all fields');
      return false;
    }
    setError('');
    return true;
  };

  const moveToHomePage = () => {
    navigate('/');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formDetails = {
      date,
      startTime,
      endTime
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
        moveToHomePage();
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Create appointment failed!');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='bg-white m-10 px-16 py-10 rounded-3xl border-2 border-gray-200'>
      <h1 className='text-4xl text-center font-semibold'>Create Appointment Slot</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='mt-8'>
            <label className='text-base font-medium' htmlFor="date">Date</label>
            <input
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              type="date"
              name="date"
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className='mt-4 flex gap-x-4'>
            <div className='w-1/2'>
              <label className='text-base font-medium' htmlFor="startTime">Start Time</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                type="time"
                name="startTime"
                id='startTime'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className='w-1/2'>
              <label className='text-base font-medium' htmlFor="endTime">End Time</label>
              <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                type="time"
                name="endTime"
                id='endTime'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className='mt-8 flex flex-col gap-y-4'>
            <button
              type='submit'
              className="active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Appointment
            </button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  )
}
