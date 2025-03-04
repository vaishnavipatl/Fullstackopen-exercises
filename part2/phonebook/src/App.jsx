import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Notification from './Notification'; 


function App() {
  const [persons, setPersons] = useState([
    // {name:'Arto Hellas',number:'040-123456' ,id: 1},
    // {name:'Vaishnavi Patil' , number :'8999682092' ,id: 5},
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }

  ])
  
  useEffect(()=>{
    console.log("effect");
    axios
       .get('http://localhost:3001/api/persons')
       .then(response=>{
        setPersons(response.data)
        console.log(response.data);
        
       })
    
  },[])
  

 const showmessage =(msg , type)=>{
    setMessage(msg)
    setMsgtype(type)
    setTimeout(()=> setMessage(null) ,2000)
 }
  
  const [newName, setNewName] = useState('')
  const [newNumber ,setNumber]=useState('')
  const [search , setSearch]=useState('')
  const[meassage ,setMessage]=useState(null)
  const[msgtype ,setMsgtype]=useState('sucess')
  
  console.log(persons)
  const filterlist = persons.filter(person=>
    (person.name?.toLowerCase() || "").includes(search.toLowerCase() || "")
  )
  
  const addContact=(e)=>{
    e.preventDefault()
   //  console.log("button clicked" , e.target);
    if (newName.trim()=== '' || newNumber.trim() === '') {
     showmessage("Both name and number are required." ,'error');
     return;
   }
  //  if(persons.some((person)=>(person.name === newName && person.number === newNumber))){
  //    showmessage(`${newName} is already added to Phonebook `)
  //    return
  //   }
 
    const newPerson ={
      name:newName ,
      number:newNumber,
    }

    axios
    .post('http://localhost:3001/api/persons/add', newPerson)
    .then(response=>{
     setPersons([...persons , response.data])
    //  console.log(response.data);
      showmessage(`${newName} added successfully!`);
     
    })
 }
  

 const deleteContact=(id)=>{
  if(window.confirm("Do you want delete this contact")){
    axios
    .delete(`http://localhost:3001/api/persons/${id}`)
    .then( ( )=>{
      setPersons(persons.filter((person)=>person.id !== id))
      showmessage(`${newName} delete successfully!`);
    })
    .catch(error =>showmessage(`Failed to delete Contact` ,'error'))
  }
 }

//  const Updatecontact=(id)=>{
//   const person = persons.find(p => p.id === id);
//   if (!person) return alert("Person not found!");

//   const updateContact = {
//     ...person,
//     name: newName.trim() || person.name,  
//     number: newNumber.trim() || person.number 
//   };
//   axios
//       .put(`http://localhost:3001/api/persons/${id}` , updateContact)
//       .then(response =>{
//         setPersons(persons.map(person=>person.id !== id ?person :response.data))
//         showmessage(`${person.name}'s number updated!`);
//       })
//       // console.log(updateContact);
//       .catch(error =>showmessage(`Error: ${person.name} was already deleted` ,'error'))
//  }
 
 
  const handleonchange=(e)=>{
   setNewName(e.target.value)
  }
  
  const handleonchange2=(e)=>{
    setNumber(e.target.value)
  }



  return (
    <>
      
     <h2>Phonebook</h2> 
     <Notification meassage={meassage} msgtype={msgtype}/>
     <div>
       <h4>Filter With<input type='text'placeholder="Search by name..." value={search} onChange={(e)=>(setSearch(e.target.value))}/></h4>
     </div>
     <h3>Add new Contacts</h3>
     <form onSubmit={addContact}>
        <div>
          Name: <input value={newName} onChange={handleonchange}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleonchange2}/>
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
     </form>
     <>
     <h3>Update Contact</h3>
      <div>
        Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={(e) => setNumber(e.target.value)} />
      </div>
      
     <h2>Numbers</h2>
     
      <ul>
      {filterlist.map((filtercontact , index)=>(
        <li key={index}>{filtercontact.name} {filtercontact.number}
         <button onClick={()=>deleteContact(filtercontact.id)}>Delete</button>
         {/* <button onClick={()=>Updatecontact(filtercontact.id)}>Edit</button>         */}
        </li>
       ))}
      </ul>
     
     </>
    
    </>
  )
}

export default App
