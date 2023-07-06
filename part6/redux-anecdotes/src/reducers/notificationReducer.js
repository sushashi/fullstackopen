import { createSlice } from "@reduxjs/toolkit";

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    popNotification(state, action) {
      return action.payload
    }
  }
})

export const setNotification = (message, howLong) => {
  return async dispatch => {
    dispatch(popNotification(message))

    setTimeout( () => 
      dispatch(popNotification('')), howLong * 1000
    )
  }
}

export const {popNotification} = notificationSlice.actions 
export default notificationSlice.reducer