import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import userlistReducer from './reducers/userlistReducer'

const store = configureStore({
  reducer:{
    notification:notificationReducer,
    blog: blogReducer,
    user: userReducer,
    userlist: userlistReducer
  }
})

export default store