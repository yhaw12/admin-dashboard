  
import { useState} from 'react';

// import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Correct import
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {useNavigate, Link } from 'react-router-dom';

import axios from 'axios';



function Signup() {

  const navigate = useNavigate();
  const [data, setData] = useState();
  
  const handleSignup = async (e)=>{
    e.preventDefault();

    try{
      const res = await axios.post('http://localhost:8081/signup', {email, password});
      if (res){
          console.log('Signup success. Navigating to dashboard...');
          console.log(password)
          navigate('/login')
      }else{
          if(res.status!==200){
            console.error('Error', res.data)
          }
        }  
      }catch (err) {
      console.error(err);
      // setError('Internal server error');
      }
  }

  const [passIcon, setPassIcon] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='w-full h-screen grid place-items-center bg-slate-300 bg[url]'>
        <div className='w-80 h-80 border m p-8 ' >
            <h1 className='font-bold text-3xl text-center mb-3 '>Signup</h1>
            <form className='flex flex-col' action="POST" onSubmit={handleSignup}>
                <div className='w-full flex items-center border mb-2'><input className='border mb-2 p-2 border-none bg-transparent focus:outline-none focus:border-transparent' type="email" value={email} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} /> <FontAwesomeIcon icon={faEnvelope} cursor='pointer'/> </div>
                

                <div className='w-full flex items-center border mb-6'><input className=' border-none p-2  bg-transparent focus:outline-none focus:border-transparent'  value={password} placeholder='Enter Password'  onChange={(e)=>setPassword(e.target.value)}  type={passIcon ? 'text' : 'password'} />
                {passIcon
                ? <FontAwesomeIcon icon={faEyeSlash}  onClick= {()=>setPassIcon(false)} cursor='pointer' />
                : <FontAwesomeIcon icon={faEye} onClick= {()=>setPassIcon(true)} cursor='pointer' />
                }</div>

                <button className='bg-[#8f460baa] w-full p-2 rounded-sm pointer' type="submit">Create An Account</button>
            </form>

            <p className='mt-2 font-light text-sm'>Have an account <Link to='/login'> <span className='pointer text-red-500'> Login</span></Link></p>
        </div>
    </div>
    
  )
}

export default Signup;