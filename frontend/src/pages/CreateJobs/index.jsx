import React, { useState } from 'react';
import Navbar from '../../components/Navbar'
import Payment from './../../components/payment';

function CreateGig() {

  const [selectedToken, setSelectedToken] = useState('Default');
  const [amount, setAmount] = useState('');
  

  const [jobTitle, setJobTitle] = useState('');
   
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);

   
 const [description, setDescription] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    const jobData = {
      jobTitle,
      tags,
      price,
      description,
      amount,
      selectedToken
    };

    console.log(jobData)
    try {
      const response = await axios.post('/api/jobs', jobData); // Replace '/api/jobs' with your backend endpoint
      console.log('Job submitted:', response.data);
      // Clear form fields after successful submission (optional)
      setJobTitle('');
      setTags([]);
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting job:', error);
    }
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
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>
        <div className='w-full'>
            <label htmlFor='tags' className='text-gray-200 block mb-2'>Add Tag</label>
            <input 
              value={tags} 
              onChange={(e) => setTags(e.target.value)} 
              className='react-tagsinput-input bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
    
            />
          </div>
        <div className='w-full'>
          <label htmlFor='price' className='text-gray-200 block mb-2'>Price</label>
          <input 
            type='text' 
            id='price' 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        <div className='w-full'>
          <label htmlFor='description' className='text-gray-200 block mb-2'>Job Description</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>
        
        <div className='flex flex-col space-y-4 px-8'>
          <h2 className='text-xl font-bold text-white'>Payment</h2>
          <div className='flex space-x-4'> 
            <div className='w-1/2'>
              <select 
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
              >
                <option value='Default'>token</option>
                <option value='ETH'>Ethereum</option>
                <option value='BTC'>Bitcoin</option>
              </select>
            </div>
            <div className='w-1/2'>
              <input
                type='text'
                placeholder='Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)} 
                className='w-full bg-gray-900 text-white rounded-md border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>
          </div>
          <button type='submit'  className='bg-primary-dark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'>
          Create Job
        </button>
        </div>
      </form>
    </div>
    
    </div>
  )
}

export default CreateGig