import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Form, InputGroup, Button } from 'react-bootstrap'

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleSubmitComment = (event) => {
    event.preventDefault()

    dispatch(addComment({
      comment: comment,
      blog: blog.id
    }))

    setComment('')
  }

  return (
    <div>
      <form onSubmit={handleSubmitComment}>
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter a comment"
              aria-label="abcd"
              aria-describedby="basic-addon2"
              onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="outline-secondary" id="addCommentBtn"
              type='submit'>
              Add Comment
            </Button>
          </InputGroup>
        </div>

      </form>
    </div>
  )
}

export default CommentForm