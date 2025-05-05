import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery ,useMutation , useQueryClient } from '@tanstack/react-query'
import { getAnecdotes ,anecdotesUpadted} from './services/requests'
import { useNotificationDispatch } from './context/NotificationContext'

const App = () => {
  const queryClient=useQueryClient()

   const notificationDispatch = useNotificationDispatch()

  const newVoteMutation = useMutation({
    mutationFn : anecdotesUpadted,
    onSuccess:(upadtedanecdote)=>{
       const anecdotes=queryClient.getQueryData(['anecdotes'])
       queryClient.setQueriesData(['anecdotes'] ,anecdotes.map(a =>a.id !== upadtedanecdote.id ? a : upadtedanecdote))
       notificationDispatch({ type: 'SET', payload: `You voted for '${upadtedanecdote.content}'` })
       setTimeout(() => {
         notificationDispatch({ type: 'CLEAR' })
       }, 5000)
}  })

const handleVote = (anecdote) => {
    newVoteMutation.mutate(anecdote)
    console.log('vote')
  }

const {isLoading , isError , data: anecdotes}=useQuery({
    queryKey :['anecdotes'],
    queryFn: getAnecdotes,
    retry:false
   })
   
   if(isLoading){
    return <div>Loading data</div>
   }

   if(isError){
    return <div>Anecdote service not available due to problems on server</div>
   }
  return (
   
   <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>

          <div>
            has {anecdote.votes}
            <button onClick = {() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
   
  )
}

export default App
