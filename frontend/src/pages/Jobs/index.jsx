import React from 'react'
import Navbar from '../../components/Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toast'



function job() {
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('https://x-ploit-backend.onrender.com/api/get-jobs');
        setJobs(response.data)
      } catch (error) {
        console.log
      }
    })();
  }, [])
  const success = () => {
    toast('Job application successful')
  }
    // job = [
    //     {   
    //         title: "Landing Page Design",
    //         tag: "frontend Developer",
    //         price: '1000USD',
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"

    //     },
    //     {   
    //       title: "Landing Page Design",
    //       tag: "frontend",
    //       price: '1000USD',
    //       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"

    //   },
    //   {   
    //     title: "Landing Page Design",
    //     tag: "frontend",
    //     price: '1000USD',
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"

    // }
    // ]
  return (
    <div className='p-6'>
        <Navbar />
      {jobs.length>0? (
        jobs.map((user, id) => (
          <div key={id} className='bg-secondary-dark w-[50%] bg-blur py-8 mx-auto mt-5 rounded-[10px] border-2 border-stone-500'>
            <div className='flex flex-col space-y-4 px-8'>
              <h2 className='text-xl font-bold text-white'>{user.title}</h2>
              <div className='flex space-x-4'>
                <div className='bg-gray-600 text-white rounded-md px-4 py-1  text-xs capitalize'>{user.tags}</div>
                <div className='bg-green-300 text-green-[.09]  px-1 py-1 text-xs capitalize '><span className="text-green-900 font-bold">{user.price}</span></div>
              </div>
              <p className='text-gray-400 text-sm'>{user.description}</p>
              <button className='w-20 rounded-full bg-primary-dark hover:bg-blue-700 text-white font-bold py-2 px-4'
              onClick={success}>
                Apply
              </button>
              <ToastContainer />
            </div>
          </div>
        ))) : <div className='font-bold text-white'>No available gig</div>}
 
    </div>
  )
}

export default job
