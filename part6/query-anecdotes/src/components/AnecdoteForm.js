import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useContext } from 'react'
import NotificationContext from "../notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  // eslint-disable-next-line no-unused-vars
  const [message, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
       
    newAnecdoteMutation.mutate({content, votes: 0},{
      onSuccess: () => {
        dispatch({type: "SET_MESSAGE", payload: `anecdote '${content}' created`}) 
      },
      onError: (error) => {
        dispatch({type:"SET_MESSAGE", payload: error.response.data.error})
      }
    })

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
