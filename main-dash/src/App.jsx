// import { useState } from 'react'
import './App.css'
import Login from './parts/Login';
import { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './parts/Dashboard';
import Signup from './Signup';
import Employees from './components/Employees';
import Profile from './components/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/index'  element={<Signup/>}/>
      <Route path='/dashboard'  element={<Dashboard/>}/>
      <Route path='/employees'  element={<Employees/>}/>
      <Route path='/profile'  element={<Profile/>}/>
    </Route>
  )
)

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
      axios.get('http://localhost:8081/users')
      .then(res =>{
        setUsers(res.data);
        <Dashboard/>
      })
      .catch(err =>{
        console.log(err);
        <Signup/>
      })
  },[])


  return (
    <>
      {/* <Login/>
      <Dashboard/> */}
      { <RouterProvider router={router}/> }
    </>
  );
}

export default App
