import {createContext, useReducer} from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case "SET_MESSAGE":
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

let t
export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, '' )
  
  clearTimeout(t)
  t = setTimeout( () => messageDispatch({type : "SET_MESSAGE", payload: ''}), 3000)
  
  return (
    <NotificationContext.Provider value = {[message, messageDispatch]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
