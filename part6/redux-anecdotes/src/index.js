import React from 'react'
import ReactDOM from 'react-dom/client'
// import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

// import anecdoteService from './services/anecdotes'
import anecdoteReducer from './reducers/anecdoteReducer'


// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer
// })
// const store = createStore(reducer)

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

// anecdoteService.getAll().then(anecdotes => 
//   anecdotes.forEach(anecdote => {
//     store.dispatch(appendAnecdote(anecdote))
//   })
// )

// anecdoteService.getAll().then(anecdotes => 
//   store.dispatch(setAnecdotes(anecdotes))
//   )

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)