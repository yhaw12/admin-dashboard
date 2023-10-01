import './App.css';
import Login from './parts/Login';
import { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom';
import Home from './parts/Home';
import Signup from './Signup';
import Employees from './components/Employees';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/*' element={<Home />}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='employees' element={<Employees />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Route>
  )
);

function App() {
  // CHECK WHETHER THE USER IS LOGIN

  function AppContent(){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
      setIsLoggedIn(window.localStorage.getItem('isLogin'));
    },[isLoggedIn, navigate])

    if (!isLoggedIn){
      navigate('/login')
    }

    return(
      <div>
        {
          isLoggedIn ? <Dashboard/> : <Login/>
        }
      </div>
    )
  }

  
  return (
    <RouterProvider router={router}>
      {/* Your components and routes go here */}
      <AppContent/>
    </RouterProvider>
  );
}

export default App;
