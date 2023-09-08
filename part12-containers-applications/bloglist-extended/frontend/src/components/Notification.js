import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (message === null) return null

  if (message.includes('wrong') || message.includes('failed')) {
    return <div className="errorNotification">{message}</div>
  } else {
    return <div className="notification">{message}</div>
  }
}

export default Notification