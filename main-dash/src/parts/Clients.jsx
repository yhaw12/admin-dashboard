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
      cell: row => <button className="bg-red-500 rounded-sm p-2" onClick={()=>handleDelete(row.id)}>Delete</button>
    }
   ]
    useEffect(()=>{
        function UserData(){
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
              setRecords(res.data);
              setFilterItems(res.data)
            })
            .catch(err=>console.log(err))
        }
        UserData()
    
    }, [])

    const [records, setRecords] = useState([])
    const [filterItems, setFilterItems] = useState([])

    const handleFilter=(e)=>{
      const newData = filterItems.filter(row=>row.name.toLowerCase().includes(e.target.value));
      setRecords(newData)
    }

    const handleDelete = ()=>{
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        const updateRecords = records.filter(row=>row.id !== id);
        setRecords(updateRecords);
        setFilterItems(updateRecords);
      })
      .catch(err=>console.log(err))



    }

  return (
    <div className="w-full h-screen p-20">
      <div className="mb-4"><input type="text" placeholder="Search ........" onChange={handleFilter}/></div>
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