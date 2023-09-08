const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1})
        .populate('comments',{comment:1})
    response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.status(200).json(blog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    const blogExist = await Blog.findById(body.blog)
    const comment = new Comment({
        comment:body.comment,
        blog: blogExist.id
    })
    const savedComment = await comment.save()
    blogExist.comments = blogExist.comments.concat(savedComment._id)
    await blogExist.save()

    response.status(201).json(savedComment)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const userT = request.user
    const user = await User.findById(userT.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if( user.id.toString() === blog.user.toString() ){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({error: 'a blog can only be deleted by its creator'})
    }

})

blogsRouter.put('/:id', async (request, response) => {
    // const body = request.body
    // const blog = {
    //     author: body.author,
    //     title: body.title,
    //     url: body.url,
    //     likes: body.likes
    // }
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body,
        {new: true, runValidators: true, context: 'query'})
        .populate('user',{username: 1, name: 1})

    response.json(result)
})

module.exports = blogsRouter