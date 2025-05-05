import { useDispatch } from "react-redux"

import { setNotification } from "../reducers/notificationReducer"
import { createAnecdoteAsync } from '../reducers/anecdoteReducer'

const CreateAnecdoteForm = () =>{
  const dispatch= useDispatch()

  const handleSubmit=async(event)=>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value =""
    dispatch(createAnecdoteAsync(content))
    dispatch(setNotification(`you added '${content}'`,5 ))
    }
  
  return(
        <form onSubmit={handleSubmit}>
            <input name="anecdote"/>
            <button type= "submit">Add</button>
        </form>
      )
}

export default CreateAnecdoteForm