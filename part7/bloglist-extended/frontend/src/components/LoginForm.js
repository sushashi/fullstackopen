import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'
import { popNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(loginUser({
      username: username,
      password: password,
    },navigate))

    dispatch(popNotification(`Welcome ${username}`,3))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type='text' name='username'
            onChange={event => setUsername(event.target.value)}/>

          <Form.Label>password</Form.Label>
          <Form.Control type='password' name='password'
            onChange={event => setPassword(event.target.value)}/>

          <Button variant='outline-primary' className='mt-2' type='submit'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
