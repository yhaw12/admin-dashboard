import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Signup() {
  const navigate = useNavigate();
  const [passIcon, setPassIcon] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [ error, setError] = useState('');

  const handleSignup = async(e)=>{
    e.preventDefault();
    if (!values.email.trim() || !values.password.trim()){
      setError('Please provide both email and password.');
      return;
    }
    setError('')


    axios.post('http://localhost:8081/signup', values)
    .then(data =>{
      if (data.status === 201) {
        console.log('Signup successful');
        navigate('/login');
      }else{
        console.log('No input was given')
        setError('Signup failed: ' + data.data.message);
      }
     
    }).catch((error)=>{
      console.error('Error occurred during signup:', error);
      setError('An error occurred during signup.');
    })

  }

  return (
    <div className='w-full h-screen grid place-items-center bg-slate-300 bg[url]'>
      <div className='w-80 h-80 border m p-8 '>
        <h1 className='font-bold text-3xl text-center mb-3 '>Signup</h1>
        <div className='font-bold text-red-500 border transition-all duration-300'>
          {
            error && error
          }
        </div>
        <form className='flex flex-col' action='POST' onSubmit={handleSignup}>
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

          <button className='bg-[#8f460baa] w-full p-2 rounded-sm pointer' type='submit'>
            Create An Account
          </button>
        </form>

        <p className='mt-2 font-light text-sm'>
          Have an account <Link to='/login'> <span className='pointer text-red-500'> Login</span></Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
