import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client'
import { useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOKS_GENRE, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState("")
  const client = useApolloClient()

  useSubscription(BOOK_ADDED , {
    onData: ({ data }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      window.alert(`A new boook "${addedBook.title}" has been added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      updateCache(client.cache, { query: BOOKS_GENRE, variables:{genre} }, addedBook)
    }
  })
  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  useEffect( () => {
    setToken(window.localStorage.getItem('library-user-token'))
  },[])
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
          ? <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} genre={genre} setGenre={setGenre} />

      <NewBook show={page === 'add' && token} filteredGenre={genre}/>

      <Recommendations show={page === 'recommend' && token} token={token} />

      <LoginForm show={page === 'login' && !token} setToken={setToken} setPage={setPage}/>
      
    </div>
  )
}

export default App
