import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   state.push(action.payload)
    // },
    // incrementVote(state, action) {
    //   const id = action.payload
    //   const anecdoteToChange = state.find(a => a.id === id)
    //   const changedAnecdote = {
    //     ...anecdoteToChange, votes: anecdoteToChange.votes + 1
    //   }
    //   return state.map(a => a.id !== id ? a : changedAnecdote)
    // },

    updateAnecdotes(state, action) {
      const updatedAnecdote = action.payload
      const id = updatedAnecdote.id

      return state.map(a => a.id !== id ? a : updatedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const incrementVote = (id) => {
  return async (dispatch, getState) => {
    const state = await getState()
    const anecdoteToChange = state.anecdotes.find(a => a.id === id)
    const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
    
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(updateAnecdotes(updatedAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const {  appendAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch(action.type){
//     case 'VOTE':
//       const id = action.payload.id
//       const anecdoteToChange = state.find(a => a.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange, votes: anecdoteToChange.votes + 1
//       }
//       return state.map(a => a.id !== id ? a : changedAnecdote)
      
//     case 'NEW_ANECDOTE':
//       return [...state, action.payload]

//     default: return state
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export const incrementVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {id}
//   }
// }

// export default reducer