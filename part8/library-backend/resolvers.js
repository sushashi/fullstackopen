const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const resolvers = {
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return user.save()
        .catch( error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret' ) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },

    addBook: async (root, args, context) => {
      const currentUser =context.currentUser
      if(!currentUser){
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      console.log('Book added',args)
      let author = await Author.findOne({name: args.author})
      if(!author) {
        const newAuthor = new Author({ name: args.author, bookCount: 0 })
        try {
          await newAuthor.save()
        } catch(error) {
            throw new GraphQLError('Author name is too short', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
        author = await Author.findOne({name: args.author})
      }
      const newBook = new Book({
        ...args,
        author: author._id
      })

      author.bookCount = author.bookCount + 1

      try {
         await newBook.save()
         await author.save()
      } catch (error) {
        if(author.bookCount === 1){
          await Author.findByIdAndDelete(author._id)
        } else {
          author.bookCount = author.bookCount - 1
          await author.save()
        }
        throw new GraphQLError('Book title is too short', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      pubsub.publish('BOOK_ADDED',{bookAdded: newBook.populate('author')})

      return newBook.populate('author')
    },
    
    editAuthor: async (root, args, context) => {
      console.log('edited')
      const currentUser = context.currentUser
      if(!currentUser){
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
    }
  },

  Subscription: {
    bookAdded:{
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },

  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      return  Author.find({})
    },
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find({genres: args.genre}).populate('author')
      }
      return  Book.find({}).populate('author')
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  // Author: {
  //   bookCount: async (root) => {
  //     const nb = (await Book.find({ author: root._id })).length
  //     return (
  //       nb
  //     )
  //   }
  // }
}

module.exports = resolvers