import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUserlist } from './reducers/userlistReducer'
import { setUser } from './reducers/userReducer'

import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedForm from './components/LoggedForm'
import BlogList from './components/BlogList'
import Users from './components/Users'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import './index.css'

import { Routes, Route , Link, useMatch } from 'react-router-dom'
import UserIndividual from './components/UserIndividual'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const userlist = useSelector(state => state.userlist)
  const bloglist = useSelector(state => state.blog)
  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUserlist())

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token) // set token var to be able to use blogService
    }
  }, [])

  const Navigation = () => {
    const padding = {
      paddingRight: 10,
    }

    const matchUser = useMatch('/users/:id')
    const indivUser = matchUser
      ? userlist.find( u => u.id === matchUser.params.id)
      : null

    const matchBlog = useMatch('/blogs/:id')
    const blog = matchBlog
      ? bloglist.find( b => b.id === matchBlog.params.id)
      : null

    return(
      <div>
        <div className='navbarStyle'>
          <Link style={padding} to='/'>Blogs</Link>
          <Link style={padding} to='/users'>Users</Link>
          {user
            ? <LoggedForm />
            : <Link style={padding} to='/login'>Login</Link>
          }
        </div>

        <Routes>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='/' element={<><BlogForm/><BlogList/></>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/users/:id' element={<UserIndividual user={indivUser}/>} />
          <Route path='/blogs/:id' element={<Blog blog={blog}/>} />
        </Routes>
      </div>
    )
  }

  return (
    <div className='container'>
      <Notification />
      <Navigation />
    </div>
  )
}

export default App
