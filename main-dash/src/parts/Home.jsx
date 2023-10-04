import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faPerson, faCalendar, faFlask, faFlag} from '@fortawesome/free-solid-svg-icons'
import Navbar from '../components/Navbar';

function Home() {

localStorage.setItem('token', true);

  const navigate = useNavigate();

  const handleLogout = ()=>{
    axios.get('http://localhost:8081/logout')
    .then(data =>{
      if (data) {
        console.log('Logout successful');
        navigate('/login');
      }else{
        console.log('logout Unsucessfull');
      }
    }).catch((error)=>{
      console.error('Error Logging out:', error);
    })
  }


  return (
    <div className='w-full h-screen flex items-center justify-between'>
      <aside className='h-full w-60 bg-slate-900 flex flex-col'>
        <div className='w-90 h-20 bg-slate-800 flex items-center p-4 m-2 rounded-md'>
          <FontAwesomeIcon icon={faHouseChimney} color='white'/>
          <h2 className='pl-4 font-bold text-white cursor-pointer'>Dashboard</h2>
        </div>
        <div className='p-2 text-white mt-4 cursor-pointer'>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faCalendar} color='white'/><Link to='/dashboard'><h2 className='pl-2 '>Dashboard</h2></Link></div>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faPeopleGroup} color='white'/><Link to='/employees'><h2 className='pl-2'>Manage Orders</h2></Link></div>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faPerson} color='white'/><Link to='/profile'><h2 className='pl-2'>Profile</h2></Link></div>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faFlag} color='white'/><Link to='/profile'><h2 className='pl-2'>Reports</h2></Link></div>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faFlask} color='white'/><Link to='/profile'><h2 className='pl-2'>Cultures</h2></Link></div>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faCalendar} color='white'/><h2 className='pl-2' onClick={handleLogout}>Logout</h2></div>
        </div>
      </aside>
      <main className='w-screen h-screen'>
        <Navbar/>
        <div className='bg-slate-700'>
          <Outlet/>
        </div>
        
      </main>



    </div>
  )
}

export default Home

 
