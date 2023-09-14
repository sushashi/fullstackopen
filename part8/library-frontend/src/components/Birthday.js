import { useState } from "react"
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_BIRTH, ALL_AUTHORS } from "../queries"
 

const Birthday = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ updateBirthday ] = useMutation(UPDATE_BIRTH, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const result = useQuery( ALL_AUTHORS )
  if (result.loading) return <div>loading...</div>
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    updateBirthday({variables: {name, born: parseInt(born)}})

    // setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthday</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={({target}) => setName(target.value)}>
            <option disabled selected value> -- select an option -- </option>
            {authors.map( (a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button onClick={submit}>update author</button>
      </form>
    </div>
  )
}

 export default Birthday