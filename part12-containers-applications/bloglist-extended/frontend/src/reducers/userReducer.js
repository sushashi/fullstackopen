import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { popNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action){
      return action.payload
    },
    clearUser(){
      return initialState
    }
  }
})

export const loginUser = ( credentials, navigate ) => {
  return async (dispatch) => {
    try{
      const user = await loginService.login(credentials)
      navigate('/')
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }catch (err) {
      console.log(err)
      dispatch( popNotification('wrong credentials',2) )
    }

  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(clearUser())
  }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer