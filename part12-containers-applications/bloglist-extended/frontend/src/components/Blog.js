import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div className='mb-2'>
        <a href={`//${blog.url}`} target='blank'>{blog.url}</a>
      </div>
      <div>{blog.likes} likes <Button variant='outline-secondary' size='sm' onClick={handleLike}>like</Button></div>
      <div className='mt-1'>added by {blog.user.name}</div>

      <div className='mt-4'>
        <h3>Comments</h3>
        <CommentForm blog={blog} />
        <ul>
          {blog.comments.map(c => <li key={c.id}>{c.comment}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog
