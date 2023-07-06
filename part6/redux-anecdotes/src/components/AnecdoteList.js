import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    console.log(state)
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVote(id))
    dispatch(setNotification('you voted \'' + anecdotes.find(a => a.id === id).content + '\'',2))
    console.log('vote', id)
  }

  const compare = (a,b) => {
    return b.votes - a.votes
  }
  const sortedAnecdotes = anecdotes.sort(compare)

  return(
    sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList