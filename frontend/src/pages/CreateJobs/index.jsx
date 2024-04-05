import React, { useState } from 'react';
import Navbar from '../../components/Navbar'
import Payment from './../../components/payment';
import axios from 'axios'
import { Link } from "react-router-dom"
function CreateGig() {

  const [jobsData, setJobsData] = useState({
    jobTitle:'',
      tags:'',
      price:'',
      description:'',
      amount:'',
      token:''
  });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(jobsData)
    try {
      const response = await axios.post('https://x-ploit-backend.onrender.com/api/create-jobs', jobsData); // Replace '/api/jobs' with your backend endpoint
      console.log('Job submitted:', response.data);
      // Clear form fields after successful submission (optional)
      
    } catch (error) {
      console.error('Error submitting job:', error);
    }
    setJobsData({})
  };

  return (
    <div className='p-6'>
      <Navbar />
      <div className='bg-secondary-dark w-[30%] bg-blur py-8 mx-auto mt-5 rounded-[10px] border-2 border-stone-500'>
      <form className='flex flex-col items-center space-y-2 px-8 ' onSubmit={handleSubmit}>
        <div className='w-full'>
          <label htmlFor='jobTitle' className='text-gray-200 block mb-2'>Job Title</label>
          <input 
            type='text'
            id='jobTitle'
            value={jobsData.jobTitle}
            onChange={(e) => setJobsData({...jobsData, jobTitle:e.target.value})}
            className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>
        <div className='w-full'>
            <label htmlFor='tags' className='text-gray-200 block mb-2'>Add Tag</label>
            <input 
              value={jobsData.tags} 
              onChange={(e) => setJobsData({...jobsData, tags:e.target.value})} 
              className='react-tagsinput-input bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
    
            />
          </div>
        <div className='w-full'>
          <label htmlFor='price' className='text-gray-200 block mb-2'>Price</label>
          <input 
            type='text' 
            id='price' 
            value={jobsData.price}
            onChange={(e) => setJobsData({...jobsData, price:e.target.value})}
            className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div className='w-full'>
          <label htmlFor='description' className='text-gray-200 block mb-2'>Job Description</label>
          <textarea
            id='description'
            value={jobsData.description}
            onChange={(e) => setJobsData({...jobsData, description:e.target.value})}
            className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>
        
        <div className='flex flex-col space-y-4 px-8'>
          <h2 className='text-xl font-bold text-white'>Payment</h2>
          <div className='flex space-x-4'> 
            <div className='w-1/2'>
            <input
                type='text'
                placeholder='Token'
                value={jobsData.token}
                onChange={(e) => setJobsData({...jobsData, token:e.target.value})}
                className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>
            <div className='w-1/2'>
              <input
                type='text'
                placeholder='Amount'
                value={jobsData.amount}
                onChange={(e) => setJobsData({...jobsData, amount:e.target.value})}
                className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>
          </div>
          <button type='submit'  className='bg-primary-dark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'>
         <Link to={'/jobs'}>Create Job</Link> 
        </button>
        </div>
      </form>
    </div>
    
    </div>
  )
}

export default CreateGig
