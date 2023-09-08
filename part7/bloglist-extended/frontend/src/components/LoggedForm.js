import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Button } from 'react-bootstrap'

const LoggedForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <>
      {user.name} logged in {' '}
      <Button size='sm' variant='outline-dark' type="submit" onClick={handleLogout}>
        logout
      </Button>
    </>
  )
}

export default LoggedForm