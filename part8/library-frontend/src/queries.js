import { gql } from '@apollo/client'

export const USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}`

export const BOOKS_GENRE = gql`
query AllBooks($genre: String){
  allBooks(genre: $genre){
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author{
      name
    }
    published
    genres
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author{
      name
    }
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const UPDATE_BIRTH = gql`
mutation updateBirthday($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ){
    name
    born
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ){
    value
  }
}
`