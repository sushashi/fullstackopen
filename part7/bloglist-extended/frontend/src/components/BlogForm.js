import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form, Row, Col } from 'react-bootstrap'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    dispatch(createBlog(newBlog))

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const formVisible = (
    <div>
      <h2>Add new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group as={Row} className="mb-2" controlId="formTitle">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Title"
              onChange={e => setTitle(e.target.value)}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2" controlId="formAuthor">
          <Form.Label column sm="2">
            Author
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Author"
              onChange={e => setAuthor(e.target.value)}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2" controlId="formUrl">
          <Form.Label column sm="2">
            URL
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="URL"
              onChange={e => setUrl(e.target.value)}/>
          </Col>
        </Form.Group>

        <Button className='mt-1' variant='outline-primary' id="createBlog-button" type="submit">
          add
        </Button>
        {' '}
        <Button className='mt-1' variant='outline-danger' onClick={() => setVisible(false)}>
          cancel
        </Button>
      </Form>
    </div>
  )

  const loggeduser = window.localStorage.getItem('loggedBlogUser')
  if (visible) {
    return(
      formVisible
    )
  } else if (!visible && loggeduser) {
    return (
      <Button variant='outline-primary' onClick={() => setVisible(true)}>Add new blog</Button>
    )
  }
}

export default BlogForm
