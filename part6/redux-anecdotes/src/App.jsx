import { useEffect } from "react"
import AnecdoteList from "./components/AnecdoteList"
import CreateAnecdoteForm from "./components/CreateAnecdotes"
import FilterSelectedAencdotes from "./components/FilterSelectedAnecdotes"
import Notification from "./components/Notification"
import { initialzeAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from 'react-redux'
const App = () => {
  const dispatch = useDispatch()
  
  useEffect(()=>{
   dispatch(initialzeAnecdotes())
 },[dispatch])
  
 return (
    <div>
      < Notification />
      <FilterSelectedAencdotes />
      <AnecdoteList />
      <h2>create new</h2>
      <CreateAnecdoteForm />
    </div>
  )
}

export default App