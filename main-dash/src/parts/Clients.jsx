import { useState, useEffect } from "react"
import axios from "axios";
import DataTable from 'react-data-table-component'


function Clients() {

   const columns =[
    {
      name: 'ID',
      selector: row=>row.id
    },
    {
      name: 'NAME',
      selector: row=>row.name
    },
    {
      name: 'EMAIL',
      selector: row=>row.email
    },
    {
      name: 'CITY',
      selector: row=>row.address.city
    },
    {
      name : 'ACTIONS',
      cell: row => <button className="bg-red-500 rounded-sm p-2" onClick={()=>deletePopUp(row.id)}>Delete</button>
    }
   ]

  //  PULL CLIENTS DATA
    useEffect(()=>{
        function UserData(){
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
              setRecords(res.data);
              // console.log(res.data)
              setFilterItems(res.data)
            })
            .catch(err=>console.log(err))
        }
        UserData()
    
    }, [])

    const [records, setRecords] = useState([])
    const [filterItems, setFilterItems] = useState([])

    // FILTER CLIENTS DATA
    const handleFilter=(e)=>{
      const newData = filterItems.filter(row=>row.name.toLowerCase().includes(e.target.value));
      setRecords(newData)
    }

    const id = useParams();
    // DELETE CLIENTS DATA
    const handleDelete = ()=>{
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        const updateRecords = records.filter(row=>row.id !== id);
        setRecords(updateRecords);
        setFilterItems(updateRecords);
      })
      .catch(err=>console.log(err))
    }

    // DELET CONFIRMATION

    const [popUp, setPopUp] = useState(false);

    const deletePopUp = (id) => {
      setPopUp(true);
      setDeleteId(id);
    }

    const handleConfirmDelete = () => {
      handleDelete(deleteId);
      setPopUp(true);
    }

    const handleCancelDelete = () => {
      setPopUp(false);
    }


  return (
    <div className="w-full h-screen p-20">
      <div className="mb-4"><input type="text" placeholder="Search ........" onChange={handleFilter}/></div>
        {popUp &&
           <div className="w-96 h-auto px-10 py-5 bg-slate-800 text-center display-none">
           <h2 className="mb-8">Are you sure you want to delete this client</h2>
           <div className="w-32 flex items-center justify-between mx-auto">
             <button className="bg-red-400 p-2 w-16 mr-4 rounded-sm cursor-pointer">YES</button>
             <button className="bg-green-400 p-2 w-16 rounded-sm cursor-pointer" onClick={()=>handleDelete(row.id)}> NO</button>
           </div>
           
         </div>
        }
     
    <DataTable
    columns={columns} 
    data={records}
    selectableRows
    pagination
    >
      </DataTable></div>
  )
}

export default Clients