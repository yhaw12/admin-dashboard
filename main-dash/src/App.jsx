import './App.css';
import Login from './parts/Login';
// import { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom';
import Home from './parts/Home';
import Signup from './Signup';
import Employees from './components/Employees';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/Protectedroute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
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
