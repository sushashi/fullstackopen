/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, USER } from '../queries'

const Recommendations = ({show, token}) => {
  const resultBooks = useQuery( ALL_BOOKS )
  const result = useQuery( USER , {
    skip: !localStorage.getItem("library-user-token") })
  
  if (!show) return null
  if (result.loading) return <div> 'loading...' </div>
  if (resultBooks.loading) return <div> 'loading...' </div>

  const favoriteGenre = result.data.me.favoriteGenre
  const books = resultBooks.data.allBooks.filter( b => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Recommendations