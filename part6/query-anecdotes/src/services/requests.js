import axios from 'axios'

const baseurl = 'http://localhost:3001/anecdotes'

export const getAnecdotes =async()=>{
    const response = await axios.get(baseurl)
    return response.data
}

export const createAnecdotes = async(newAnecdote)=>{
    const response = await axios.post(baseurl, {
        ...newAnecdote,
        votes: 0
      })
      
    return response.data
}

export const anecdotesUpadted = async(anecdote)=>{
    const response = await axios.put(`${baseurl}/${anecdote.id}` ,
        {...anecdote , votes: anecdote.votes+1})
    return response.data
}