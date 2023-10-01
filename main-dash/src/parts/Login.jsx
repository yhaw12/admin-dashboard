import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate = useNavigate();
  const [passIcon, setPassIcon] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [ error, setError] = useState('');
  axios.defaults.withCredentials = true

  
  const handleLogin = (e) => {
    e.preventDefault();
    if (!values.email.trim() || !values.password.trim()){
      setError('Please provide both email and password.');
      return;
    }
    setError('')

    axios.post('http://localhost:8081/login', values)
    .then(data =>{
      if (data) {
        console.log('login successful');
        navigate('/dashboard');
        console.log(data.data.message)
      }else{
        console.log('No input was given')
        console.log(data.data.message)

        setError('login failed: ' + data.data.message);
      }
     
    }).catch((error)=>{
      console.error('Error occurred during login:', error);
      setError('An error occurred during login.');
    })
  };

  return (
    <div className='w-full h-screen grid place-items-center bg-slate-300 '>
      <div className='w-80 h-80 border m p-8 '>
        <h1 className='font-bold text-3xl text-center transition-all mb-3 '>Login</h1>
        <div className='font-bold text-red-500 border transition-all duration-300'>
          {
            error && error
          }
        </div>
        <form className='flex flex-col' action='submit' onSubmit={handleLogin}>
          <div className='w-full flex items-center border mb-2'>
            <input
              className='border mb-2 p-2 border-none bg-transparent focus:outline-none focus:border-transparent'
              type='email'
              value={values.email}
              placeholder='Enter Email'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <FontAwesomeIcon icon={faEnvelope} cursor='pointer' />
          </div>

          <div className='w-full flex items-center border mb-6'>
            <input
              className='border-none p-2 bg-transparent focus:outline-none focus:border-transparent'
              value={values.password}
              placeholder='Enter Password'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              type={passIcon ? 'text' : 'password'}
            />
            {passIcon ? (
              <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPassIcon(false)} cursor='pointer' />
            ) : (
              <FontAwesomeIcon icon={faEye} onClick={() => setPassIcon(true)} cursor='pointer' />
            )}
          </div>

          <button className='bg-[#164A] w-full p-2 rounded-sm pointer' type='submit'>
            Log In
          </button>
        </form>

        <p className='mt-2 font-light text-sm'>
          Don't have an account <Link to='/signup'> <span className='pointer text-red-500'> Sign up</span></Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
