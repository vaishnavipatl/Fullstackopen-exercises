import{ configureStore } from '@reduxjs/toolkit'
import anecdotereducer from './anecdoteReducer'
import filterReducer from './formreducers'
import notificationReducer from './notificationReducer'
const store = configureStore({
    reducer :{
        anecdotes : anecdotereducer,
        filter : filterReducer,
        notification : notificationReducer
    }
})

export default store