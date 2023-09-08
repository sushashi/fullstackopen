import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { popNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog)

  const deleteButton = (blog) => {
    const user = useSelector(state => state.user)
    if (user && user.username === blog.user.username) {
      return (
        <div>
          <Button
            variant='outline-danger'
            size='sm'
            onClick={() => handleDelete(blog)}>
            Delete
          </Button>
        </div>
      )
    } else {
      return null
    }
  }

  const compareFn = (a, b) => {
    return b.likes - a.likes
  }
  const sortedBlogs = [...blogs].sort(compareFn)

  const handleDelete = (blog) => {
    if(window.confirm(`Do you want to delete ${blog.title} from ${blog.author}`)){
      dispatch(deleteBlog(blog))
      dispatch(popNotification(`Entry ${blog.title} from ${blog.author} deleted`,3))
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Added by</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs.map( (blog) => (
            <tr key={blog.id}>
              <td> <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> </td>
              <td>{blog.user.name}</td>
              <td>{deleteButton(blog)}</td>
            </tr>
          ))}
        </tbody>


      </Table>
    </div>

  )
}

export default BlogList