/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import PropTypes from 'prop-types'

const NotificationContext = createContext()


const notificationReducer =(state,action)=>{
    switch(action.type){
        case 'SET' :
            return action.payload
        case 'CLEAR' :
            return ''
        default :
            return state
    }
}


export const NotificationContextProvider = (props) =>{
    const [notification , notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification ,notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () =>{
    const [notification] = useContext(NotificationContext)
    return notification
}

export const useNotificationDispatch = () =>{
    const [,notificationDispatch] = useContext(NotificationContext)
    return notificationDispatch
}


NotificationContextProvider.propTypes = {
    children: PropTypes.node.isRequired
  }

