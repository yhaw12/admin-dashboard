
// import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const checkUserAuthentication = ()=>{
  const token = localStorage.getItem('token');
  return !!token
}



function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = checkUserAuthentication();


  useEffect(()=>{
    if (!isAuthenticated){
      navigate('/login');
      return null;
    }
  
    return children
  },[])

 
}

export default ProtectedRoute