import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      // state.push(action.payload)
      return [...state, action.payload]
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload.id)
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    dispatch(initializeBlogs())
  }
}

export const likeBlog = (blog) => {
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id, // careful: populate user in backend !
    comments: blog.comments.id // careful: populate comments in backend !!
  }
  return async (dispatch) => {
    await(blogService.update(changedBlog))
    const allBlogs = await(blogService.getAll())
    dispatch(setBlogs(allBlogs))
  }
}

export const addComment = (content) => {
  return async(dispatch) => {
    await blogService.comment(content)
    const allBlogs = await(blogService.getAll())
    dispatch(setBlogs(allBlogs))
  }
}

export const deleteBlog = (blog) => {
  return async(dispatch) => {
    await(blogService.remove(blog.id))
    dispatch(removeBlog(blog))
  }
}

export const { setBlogs, appendBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer