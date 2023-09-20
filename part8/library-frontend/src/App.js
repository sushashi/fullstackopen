import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState("")
  const client = useApolloClient()
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

      <Recommendations show={page === 'recommend' && token} />

      <LoginForm show={page === 'login' && !token} setToken={setToken} setPage={setPage}/>
      
    </div>
  )
}

export default App
