import { useMutation ,useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from '../services/requests'
import { useNotificationDispatch } from "../context/NotificationContext"

const AnecdoteForm = () => {
  
  const notificationDispatch = useNotificationDispatch()
  
  const queryClient=useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn : createAnecdotes ,
    onSuccess :(newAnecdote)=>{
      const anecdotes= queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'] ,[...anecdotes, newAnecdote])
      notificationDispatch({type:'SET' ,payload :`Anecdotes ${newAnecdote.content} created`})
      setTimeout(()=>{
        notificationDispatch({type:'CLEAR'})
      },5000)
    },
   onError:(error)=>{
    notificationDispatch({type:'SET' ,payload :`Anecdotes ${error.response.data.error}`})
    setTimeout(()=>{
      notificationDispatch({type:'CLEAR'})
    },5000)
   }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content})
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
