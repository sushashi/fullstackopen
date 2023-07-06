import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './notificationContext'

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [message, dispatch] = useContext(NotificationContext)
  const result = useQuery('anecdotes', getAnecdotes, {retry: 1})
  const anecdotes = result.data

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch( { type: "SET_MESSAGE", payload: `anecdote '${anecdote.content}' voted` } )
    console.log('vote')
  }
  console.log("Query status :", result)

  if (result.isLoading){
    return <div>loading data...</div>
  }

  if (result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
