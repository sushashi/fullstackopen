import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const Notification = () => {
  const [message] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  console.log("MESSAGE :", message)
  if (message === '') return ""

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
