import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState:[],
  reducers :{
    voteAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id === updated.id ? updated : a)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAencdotes(state ,action){
      return action.payload
    }
  }
})

export const initialzeAnecdotes =()=>{
  return async (dispatch)=>{
    const anecdotes =await anecdoteService.getAll()
    dispatch(setAencdotes(anecdotes))
  }
}

export const voteAnecdoteAsync = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(voteAnecdote(updated))
  }
}

export const createAnecdoteAsync = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const { voteAnecdote ,createAnecdote ,setAencdotes} =anecdoteSlice.actions
export default anecdoteSlice.reducer