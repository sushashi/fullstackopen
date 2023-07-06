import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import { useEffect } from 'react'
// import anecdotesService from './services/anecdotes'
// import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect( () => {
    // anecdotesService.getAll().then(anec => dispatch(setAnecdotes(anec)))
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App