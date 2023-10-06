import { useState } from 'react';
import pxfuel from '../assests/pxfuel.jpg'
import axios from 'axios';

function Upt() {

    // PATIENT PARTICULARS 
    const patientParticulars ={
        NAME: '', 
        AGE: '',
        SEX: '',
        DATE:  '',
    }

    const initialState = {
        specificGravity: '',
        blood : '',
        protein: '',
        glucose: '',
        bilirubin: '',
        urobilinogen: '',
        nitrites: '',
        leukocytes: '',
        epithelialCells: '',
        pusCells: '',
        rBCs: ''
    };    

    const [particulars, setParticulars] = useState(patientParticulars);
    const handlePartChange = (e) => {
        setParticulars({ ...particulars, [e.target.name]: e.target.value.toUpperCase() });
    };

    
    const [forms, setForms] = useState(initialState);

    const handleChange = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5173', forms)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setForms(initialState);
    setParticulars(patientParticulars)
  };

  
  return (
    <section className='w-full h-screen  p-8  bg-slate-400'>

      <div className=' outline px-20 py-6'>
        <div className='flex items-center justify-evenly mb-4'>
          <img className='w-20' src={pxfuel}  />
          <div><h1>MEDICAL LABORATORY REPORT (CHEMICAL PATHOLOGY)</h1></div>
        </div>
        <form className='grid grid-cols-2 mb-8' onSubmit={handleSubmit}>
          {Object.keys(particulars).map((key) => (
            <div className='w-60'>
              <div key={key} className=' flex justify-between mb-3'>
                <label>{key}</label>
                {key === 'DATE' ?
                   <input type='date' name={key} value={particulars[key]} onChange={handlePartChange} /> 
                :
                    <input name={key} value={particulars[key]} onChange={handlePartChange} />
                }
              </div>
            </div>
          ))}
        </form>

        {/* lab data */}
        <form onSubmit={handleSubmit}  className='w-full h-auto'>
          <table className='w-full'>
            <thead>
              <th className='box-border border-2 p-2'>TEST</th>
              <th className='box-border border-2 p-2'>RESULTS</th>
            </thead>
            <tbody>
              {Object.keys(forms).map((key) => (
                <tr  key={key}>
                  <td className='box-border border-2 p-2 px-8 grid place-items-center'>{key.toLocaleUpperCase()}</td>
                  <td className='box-border border-2 p-2 '>
                    <input className='outline-none bg-transparent ml-12' name={key} value={forms[key].toLocaleUpperCase()} onChange={handleChange} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </section>
  )
}

export default Upt