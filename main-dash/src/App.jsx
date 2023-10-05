import './App.css';
import Login from './parts/Login';
// import { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './parts/Home';
import Signup from './Signup';
import Employees from './components/Employees';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/Protectedroute';
import Clients from './parts/Clients';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="clients" element={<Clients />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);


function App() {
  // CHECK WHETHER THE USER IS LOGIN

  return (
    <RouterProvider router={router}>
      {/* Your components and routes go here */}
      
    </RouterProvider>
  );
}

export default App;
