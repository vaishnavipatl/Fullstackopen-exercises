import { createSlice } from "@reduxjs/toolkit"

export const setNotificationWithTimeout = (message, seconds) => {
    return async (dispatch) => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, seconds * 1000)
    }
  }
  
const notificationSlice = createSlice({
    name : 'notification',
    initialState : 'Welcome to Anecdotes',
    reducers :{
        setNotification(state, action) {
            return action.payload
          },
          clearNotification() {
            return ''
          }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer