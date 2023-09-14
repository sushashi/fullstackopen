import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import Birthday from './Birthday'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useQuery( ALL_AUTHORS )
  if(result.loading){
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Birthday />
    </div>
  )
}

export default Authors
