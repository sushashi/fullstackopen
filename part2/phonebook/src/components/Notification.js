const Notification = ({message}) => {
    if (message===null) return null
  
    if(message.includes("removed")){
      return(
        <div className = "errorNotification">{message}</div>
      )
    }else{
      return(
        <div className = "notification">{message}</div>
      )
    }
}
export default Notification