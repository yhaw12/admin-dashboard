import { Outlet, useNavigate } from 'react-router-dom'

import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faPerson, faCalendar} from '@fortawesome/free-solid-svg-icons'


function Dashboard() {

  const navigate = useNavigate();
  return (
    <div className='w-full h-screen flex items-center justify-between'>
      <sidebar className='h-full w-60 bg-slate-900 flex flex-col'>
        <div className='w-90 h-20 bg-slate-800 flex items-center p-4 m-2 rounded-md'>
          <FontAwesomeIcon icon={faHouseChimney} color='white'/>
          <h2 className='pl-4 font-bold text-white cursor-pointer'>Dashboard</h2>
        </div>
        <div className='p-2 text-white mt-4 cursor-pointer'>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faCalendar} color='white'/><h2 className='pl-2 '>Dashboard</h2></div>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faPeopleGroup} color='white'/><h2 className='pl-2'>Manage Employees</h2></div>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faPerson} color='white'/><h2 onClick={navigate('/dashboard/profile')} className='pl-2'>Profiless</h2></div>
          <div className='flex items-center mb-6 py-2 px-1 bg-slate-700 rounded-sm'><FontAwesomeIcon icon={faCalendar} color='white'/><h2 className='pl-2'>Logout</h2></div>
        </div>
      </sidebar>
      <main className='w-screen h-screen'>
        <div className='h-10 shadow-md text-center items-center'><h1>Dashboard Content Area</h1></div>
        <Outlet/>
      </main>
    </div>
  )
}

export default Dashboard

 
