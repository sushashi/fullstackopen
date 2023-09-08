import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = []

const userlistSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    setUserlist(state, action){
      return action.payload
    }
  }
})

export const initializeUserlist = () => {
  return async (dispatch) => {
    const userlist = await usersService.getAll()
    dispatch(setUserlist(userlist))
  }
}

export const { setUserlist } = userlistSlice.actions
export default userlistSlice.reducer