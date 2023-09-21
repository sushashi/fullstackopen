const typeDefs = `
  type Subscription {
    bookAdded: Book!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ):Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
    createUser(
      username: String!
      favoriteGenre: String!
    ):User
    login(
      username: String!
      password: String!
    ):Token
  }
`

module.exports = typeDefs