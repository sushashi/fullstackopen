import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_GENRE} from '../queries'

const Books = ({genre, setGenre, show}) => {

  const result = useQuery(ALL_BOOKS)
  const res = useQuery( BOOKS_GENRE, {variables: {genre}} )

  if (result.loading) return <div>loading ...</div>
  const booksGenre = result.data.allBooks

  if (res.loading) return console.log('loading...')
  const books = res.data.allBooks

  const genres = booksGenre.map(b => b.genres)
  let cat = []
  genres.forEach(ge => cat = cat.concat(ge))
  
  let uniqueCat = [...new Set(cat)]

  if (!show) {
    return null
  }

  const flashy = {
    color: 'red',
  }

  return (
    <div>
      <h2>books</h2>
      { genre ? <div>in genre <b>{genre}</b></div> : '' }

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
      {uniqueCat.map( b => (
        (genre === b) 
          ? <button style={flashy} onClick={ () => setGenre(b) }>{b}</button>
          : <button onClick={ () => setGenre(b) }>{b}</button>
        )      
      )}
      <button onClick={ () => setGenre('') }>all genre</button>
    </div>
  )
}

export default Books
