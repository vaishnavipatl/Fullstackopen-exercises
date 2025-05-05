 import { useDispatch } from "react-redux"
 import { setFilter } from "../reducers/formreducers"
 const FilterSelectedAencdotes = () =>{
   const dispatch= useDispatch()
 
   const handleChange=(event)=>{
     event.preventDefault()
     const filter = event.target.value
     dispatch(setFilter(filter))
     }
   
   return(
         <form >
             Filter <input onChange={handleChange}/>
         </form>
       )
 }
 
 export default FilterSelectedAencdotes