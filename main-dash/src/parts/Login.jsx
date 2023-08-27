  
import { useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Correct import
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';



function Login() {


  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
      await axios.get('http://localhost:8081/users', {
        email, password
      })
    }catch (error){
      console.error(error)
    }
  };

  const navigate = useNavigate()

  const [passIcon, setPassIcon] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='w-full h-screen grid place-items-center bg-slate-300 bg[url]'>
        <div className='w-80 h-80 border m p-8 ' >
            <h1 className='font-bold text-3xl text-center mb-3 '>Login</h1>
            <form className='flex flex-col' action="GET" onSubmit={handleLogin}>
                <div className='w-full flex items-center border mb-2'><input className='border mb-2 p-2 border-none bg-transparent focus:outline-none focus:border-transparent' type="email" value={email} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} /> <FontAwesomeIcon icon={faEnvelope} cursor='pointer' size={20}/> </div>
                

                <div className='w-full flex items-center border mb-6'><input className=' border-none p-2  bg-transparent focus:outline-none focus:border-transparent'  value={password} placeholder='Enter Password'  onChange={(e)=>setPassword(e.target.value)}  type={passIcon ? 'text' : 'password'} />
                {passIcon
                ? <FontAwesomeIcon icon={faEyeSlash}  onClick= {()=>setPassIcon(false)} cursor='pointer' />
                : <FontAwesomeIcon icon={faEye} onClick= {()=>setPassIcon(true)} cursor='pointer' />
                }</div>

                <button className='bg-[#164A] w-full p-2 rounded-sm pointer' type="submit" onClick={()=> navigate('/dashboard')}>Log In</button>
            </form>

            <p className='mt-2 font-light text-sm'>Don't have an account <Link to='/'> <span className='pointer text-red-500'> Sign up</span></Link></p>
        </div>
    </div>
    
  )
}

export default Login;