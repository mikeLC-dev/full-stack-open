const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const { usersInDb } = require('../tests/test_helper')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware');

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
      
  })
  
blogsRouter.post('/',middleware.tokenExtractor,middleware.tokenValidator,middleware.userExtractor, async (request, response,next) => {

    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
        const blog = new Blog({
      title: body.title,
      author: user.name,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if(!blog.likes){
      blog.likes = 0
    }

    try{
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
     
  })


  blogsRouter.delete('/:id',middleware.tokenExtractor,middleware.tokenValidator,middleware.userExtractor, async (request, response, next) => {
    //const token = request.token
    //const decodedToken = jwt.verify(token, process.env.SECRET)
    //const user = await User.findById(decodedToken.id)
    const user = request.user
    const blogToDelete = await Blog.findById(request.params.id)
    console.log("blog.user.id:",blogToDelete.user._id.toString())
    console.log("user.id:",user._id.toString())
    if ( blogToDelete.user._id.toString() === user._id.toString() ) {
        try {
            await Blog.findByIdAndDelete(request.params.id)
            response.status(204).end()
          } catch (exception) {
            next(exception)
          }
    } else {
        return response.status(401).json({ error: `Unauthorized` })
    }
  })

  blogsRouter.put('/:id', async (request, response,next) => {
    const id = request.params.id.toString()
    const body = request.body
    const blogToUpdate = await Blog.findById(id)
      const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      }


    try{
      const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
      logger.info(`blog ${newBlog.title} successfully updated`)
      response.json(updatedBlog.toJSON())
      
    } catch(exception){
      next(exception)
    }



  })

  module.exports = blogsRouter