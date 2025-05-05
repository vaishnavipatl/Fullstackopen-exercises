import { useDispatch , useSelector } from "react-redux";
import { voteAnecdoteAsync } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteList=() =>{
    const anecdotes = useSelector(({anecdotes ,filter})=>{
        const filtered = anecdotes.filter(anecdote=>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
    ) 
       return [...filtered].sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()
    

    const handlevote =(anecdote)=>{
        dispatch(voteAnecdoteAsync(anecdote))
        dispatch(setNotification(`You Voted '${anecdote.content}'`,5 ))
    }

    return(
        <div>
            {anecdotes.map((anecdote)=>(
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handlevote(anecdote)}>Vote</button>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList